/**
 * Behavioural check for the cub3D demo.
 *
 * Deliberately NOT a package dependency, same as check-fractol-demo.mjs: this
 * is a static site with no test runner.
 *
 *   npm run build
 *   npx serve dist -p 4400          # NOT `serve -s` — SPA mode rewrites every
 *                                   # route to the homepage and the demo vanishes
 *   node scripts/check-cub3d-demo.mjs http://localhost:4400/projects/cub3d/
 *
 * Needs `playwright` resolvable — run it from a checkout that has it, or
 * `npm i -D playwright` temporarily. Exits non-zero on failure.
 *
 * What this guards that a screenshot cannot: a raycaster that renders one frame
 * and never updates looks perfect in a still. Half of these assertions are
 * about the picture *changing* for the right reason.
 */
import { chromium } from 'playwright';

const URL = process.argv[2];
if (!URL) {
  console.error('usage: node scripts/check-cub3d-demo.mjs <url of the cub3d project page>');
  process.exit(2);
}

const browser = await chromium.launch();
let failures = 0;
const check = (name, ok, detail = '') => {
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? ' — ' + detail : ''}`);
  if (!ok) failures++;
};

async function bootPage(opts = {}) {
  const ctx = await browser.newContext({ viewport: { width: 1200, height: 900 }, ...opts });
  const page = await ctx.newPage();
  await page.goto(URL, { waitUntil: 'networkidle' });
  await page.locator('[data-cub3d]').scrollIntoViewIfNeeded();
  return { ctx, page };
}

/** Colours in a horizontal band across the middle of the viewport. The top of
 *  the frame is flat ceiling and never changes, so sampling there proves
 *  nothing. */
const band = async (page) =>
  page.evaluate(() => {
    const c = document.querySelector('[data-cub3d] [data-canvas]');
    const d = c.getContext('2d').getImageData(0, Math.floor(c.height * 0.45), c.width, 40).data;
    const seen = new Set();
    for (let i = 0; i < d.length; i += 4) seen.add(d[i] | (d[i + 1] << 8) | (d[i + 2] << 16));
    return { size: seen.size, hash: d.join() };
  });

// --- 1. it boots, and it boots on scroll ------------------------------------
{
  const { ctx, page } = await bootPage();
  await page.waitForFunction(
    () => !document.querySelector('[data-cub3d] [data-status]')?.hidden === false,
    null,
    { timeout: 15000 },
  ).catch(() => {});
  await page.waitForTimeout(2500);

  const first = await band(page);
  check('renders a textured frame', first.size > 50, `${first.size} distinct colours`);

  const activeMap = await page.getAttribute('[data-cub3d] [data-map][aria-pressed="true"]', 'data-map');
  check('opens on the default map', activeMap === 'bonus_futur_du_retour_de_l_anterieur', activeMap ?? 'none');

  // --- 2. walking changes the view -----------------------------------------
  await page.locator('[data-cub3d] [data-canvas]').click();
  await page.keyboard.down('w');
  await page.waitForTimeout(350);
  await page.keyboard.up('w');
  await page.waitForTimeout(150);
  const walked = await band(page);
  check('holding W moves the player', walked.hash !== first.hash);

  // A tap can start and end between two frames. If only held keys are sent,
  // tapping does nothing and the demo reads as broken.
  const beforeTap = await band(page);
  await page.keyboard.press('ArrowRight');
  await page.waitForTimeout(200);
  const tapped = await band(page);
  check('a tapped arrow turns the view', tapped.hash !== beforeTap.hash);

  // --- 3. the source panel tracks the player -------------------------------
  const marker = await page.evaluate(() => {
    const m = document.querySelector('[data-cub3d] [data-source] mark');
    if (!m) return null;
    return { char: m.textContent, background: getComputedStyle(m).backgroundColor };
  });
  check('the map source marks the player position', marker !== null, marker?.char ?? 'no <mark>');
  // Astro scopes styles at build time; this <mark> is created at runtime, so
  // without :global() the rule misses and it renders as the browser's yellow.
  check(
    'the marker is styled, not browser-default yellow',
    marker !== null && marker.background !== 'rgb(255, 255, 0)',
    marker?.background ?? '',
  );

  // --- 4. switching maps -----------------------------------------------------
  await page.click('[data-cub3d] [data-map="signs"]');
  await page.waitForTimeout(2000);
  const switched = await band(page);
  const src = await page.textContent('[data-cub3d] [data-source]');
  check('switching map redraws the world', switched.hash !== tapped.hash);
  check('switching map swaps the source shown', src.includes('sign1.xpm'));

  // --- 5. idle costs nothing -------------------------------------------------
  // The engine renders on demand behind its own dirty flag; a free-running
  // rAF loop in the harness would undo that and keep the page busy forever.
  const a = await band(page);
  await page.waitForTimeout(700);
  const b = await band(page);
  check('nothing redraws while idle', a.hash === b.hash);

  // --- 6. the page keeps its own keys ---------------------------------------
  await page.evaluate(() => document.querySelector('[data-cub3d] [data-canvas]').blur());
  const scrollBefore = await page.evaluate(() => window.scrollY);
  await page.keyboard.press('ArrowDown');
  await page.waitForTimeout(250);
  const scrollAfter = await page.evaluate(() => window.scrollY);
  check('arrow keys scroll the page when the canvas is not focused', scrollAfter !== scrollBefore);

  // --- 7. no horizontal overflow --------------------------------------------
  const overflows = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
  );
  check('the page does not scroll sideways', !overflows);

  await ctx.close();
}

// --- 8. reduced motion gets the still frame, with a way in ------------------
{
  const { ctx, page } = await bootPage({ reducedMotion: 'reduce' });
  await page.waitForTimeout(1200);
  const state = await page.evaluate(() => {
    const root = document.querySelector('[data-cub3d]');
    const img = root.querySelector('[data-fallback]');
    const note = root.parentElement.querySelector('.fallback-note');
    return {
      fallbackShown: !img.hidden && (img.currentSrc || img.src).includes('fallback.png'),
      canvasHidden: root.querySelector('[data-canvas]').hidden,
      noteText: note?.textContent ?? '',
      hasOptIn: !!note?.querySelector('button'),
      noteStyled: note ? getComputedStyle(note).fontSize !== '16px' : false,
    };
  });
  check('reduced motion shows the captured frame', state.fallbackShown && state.canvasHidden);
  check('reduced motion is not a dead end', state.hasOptIn, state.noteText.slice(0, 60));
  check('the fallback note is styled', state.noteStyled);
  await ctx.close();
}

// --- 9. phones get controls ------------------------------------------------
{
  const { ctx, page } = await bootPage({
    viewport: { width: 390, height: 844 },
    hasTouch: true,
    isMobile: true,
  });
  await page.waitForTimeout(2500);
  const pad = await page.evaluate(() => {
    const p = document.querySelector('[data-cub3d] [data-pad]');
    return { visible: getComputedStyle(p).display !== 'none', buttons: p.querySelectorAll('[data-key]').length };
  });
  check('a touch device gets the on-screen pad', pad.visible, `${pad.buttons} buttons`);

  if (pad.visible) {
    const before = await band(page);
    const fwd = page.locator('[data-cub3d] [data-pad] [data-key="119"]');
    await fwd.dispatchEvent('pointerdown');
    await page.waitForTimeout(350);
    await fwd.dispatchEvent('pointerup');
    await page.waitForTimeout(150);
    const after = await band(page);
    check('the pad walks the player', after.hash !== before.hash);

    // A finger dragged off a button fires pointercancel or pointerleave, never
    // pointerup. Without those the player walks forever.
    await fwd.dispatchEvent('pointerdown');
    await page.waitForTimeout(120);
    await fwd.dispatchEvent('pointercancel');
    await page.waitForTimeout(400);
    const c1 = await band(page);
    await page.waitForTimeout(500);
    const c2 = await band(page);
    check('a cancelled press stops the player', c1.hash === c2.hash);
  }

  const overflows = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
  );
  check('no sideways scroll at phone width', !overflows);
  await ctx.close();
}

await browser.close();
console.log(failures ? `\n${failures} check(s) failed` : '\nall checks passed');
process.exit(failures ? 1 : 0);
