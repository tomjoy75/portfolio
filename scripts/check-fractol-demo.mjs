/**
 * Behavioural check for the Fract-ol demo — touch input and static fallback.
 *
 * Deliberately NOT a package dependency: this is a static site with no test
 * runner, and adding Playwright to ship a 27 KB WASM demo is not a trade worth
 * making. Run it against a built site when the demo changes, or for the launch
 * audit's "touch works on mobile" item:
 *
 *   npm run build
 *   npx serve dist -p 4400          # NOT `serve -s` — SPA mode rewrites every
 *                                   # route to the homepage and the demo vanishes
 *   node scripts/check-fractol-demo.mjs http://localhost:4400/projects/fract-ol/
 *
 * Needs `playwright` resolvable — run it from a checkout that has it, or
 * `npm i -D playwright` temporarily. Exits non-zero on failure.
 *
 * Multi-touch is driven with synthetic PointerEvents rather than a real
 * touchscreen API, which exercises the component's handlers directly. A real
 * pinch delivers smaller per-move deltas, so it zooms more gradually than the
 * two-step jump this script produces.
 */
import { chromium } from 'playwright';
const URL = process.argv[2];
const browser = await chromium.launch();
let failures = 0;
const check = (name, ok, detail = '') => {
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? ' — ' + detail : ''}`);
  if (!ok) failures++;
};

async function bootPage(opts = {}) {
  const ctx = await browser.newContext({ viewport: { width: 1200, height: 900 }, ...opts });
  const page = await ctx.newPage();
  return { ctx, page };
}

// --- 1. desktop: boots, pan changes the view, pinch changes zoom -------------
{
  const { ctx, page } = await bootPage();
  await page.goto(URL, { waitUntil: 'networkidle' });
  await page.locator('[data-fractol]').scrollIntoViewIfNeeded();
  await page.waitForSelector('[data-stats]:not([hidden])', { timeout: 30000 });
  await page.waitForTimeout(600);
  check('demo boots', true);

  const hashOf = () => page.evaluate(() => {
    const d = document.querySelector('[data-canvas]').toDataURL();
    let h = 0; for (let i = 0; i < d.length; i += 97) h = (h * 31 + d.charCodeAt(i)) | 0;
    return h;
  });

  const before = await hashOf();
  // single-pointer drag = pan
  await page.evaluate(() => {
    const c = document.querySelector('[data-canvas]');
    const r = c.getBoundingClientRect();
    const ev = (t, x, y, id = 1) => c.dispatchEvent(new PointerEvent(t, {
      pointerId: id, clientX: r.left + x, clientY: r.top + y, bubbles: true, pointerType: 'touch',
    }));
    c.setPointerCapture = () => {}; c.releasePointerCapture = () => {};
    ev('pointerdown', 400, 300); ev('pointermove', 300, 240); ev('pointerup', 300, 240);
  });
  await page.waitForTimeout(500);
  check('touch drag pans the view', (await hashOf()) !== before);

  const zoomBefore = await page.locator('[data-zm]').textContent();
  // two-pointer pinch outward = zoom in
  await page.evaluate(() => {
    const c = document.querySelector('[data-canvas]');
    const r = c.getBoundingClientRect();
    const ev = (t, id, x, y) => c.dispatchEvent(new PointerEvent(t, {
      pointerId: id, clientX: r.left + x, clientY: r.top + y, bubbles: true, pointerType: 'touch',
    }));
    ev('pointerdown', 1, 350, 300); ev('pointerdown', 2, 450, 300);
    ev('pointermove', 1, 250, 300); ev('pointermove', 2, 550, 300);
    ev('pointerup', 1, 250, 300); ev('pointerup', 2, 550, 300);
  });
  await page.waitForTimeout(500);
  const zoomAfter = await page.locator('[data-zm]').textContent();
  check('pinch outward zooms in', zoomAfter !== zoomBefore, `${zoomBefore} -> ${zoomAfter}`);
  await ctx.close();
}

// --- 2. reduced motion: still frame + opt-in --------------------------------
{
  const { ctx, page } = await bootPage({ reducedMotion: 'reduce' });
  await page.goto(URL, { waitUntil: 'networkidle' });
  await page.locator('[data-fractol]').scrollIntoViewIfNeeded();
  await page.waitForSelector('[data-fallback]:not([hidden])', { timeout: 15000 });
  const src = await page.locator('[data-fallback]').getAttribute('src');
  check('reduced motion shows the still frame', !!src, src);
  const btn = page.getByRole('button', { name: 'Run it anyway' });
  check('opt-in button offered', await btn.isVisible());
  await btn.click();
  await page.waitForSelector('[data-stats]:not([hidden])', { timeout: 30000 });
  check('opt-in actually boots the renderer', true);
  await ctx.close();
}

// --- 3. wasm unavailable: still frame, no opt-in ----------------------------
{
  const { ctx, page } = await bootPage();
  await page.route('**/fractol.wasm', (r) => r.abort());
  await page.goto(URL, { waitUntil: 'networkidle' });
  await page.locator('[data-fractol]').scrollIntoViewIfNeeded();
  await page.waitForSelector('[data-fallback]:not([hidden])', { timeout: 20000 });
  check('wasm failure shows the still frame', true);
  check('no opt-in offered when it genuinely cannot run',
    !(await page.getByRole('button', { name: 'Run it anyway' }).isVisible().catch(() => false)));
  await ctx.close();
}

await browser.close();
console.log(failures ? `\n${failures} FAILURE(S)` : '\nall checks passed');
process.exit(failures ? 1 : 0);
