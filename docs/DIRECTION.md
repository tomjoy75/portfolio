# Portfolio — Product & Technical Direction

Status: **in build.** Fract-ol WASM spike passed (§6.3). Astro shell and content model exist.
Next action is integrating the Fract-ol demo into the site (§8, build order step 3).

Derived from a structured interview (24 questions, 4 rounds) plus direct inspection of 59 public
GitHub repositories under `tomjoy75`.

---

## 1. Positioning

**"Engineer who works close to the machine and close to the product."**

C/systems at one end, shipped web products at the other, professional backend and cloud work in the
middle. The heterogeneity of the project list is the point — it reads as range, not as scatter, once
the through-line is stated explicitly.

Career context (professional musician and live-performance administrator before 42) appears as a
one-line credibility anchor — evidence of learning hard things fast and shipping under deadline. It
is **not** the theme, and it is **not** hidden.

**Audience priority:** engineers and CTOs first (depth, reasoning, real evidence), with a recruiter
fast-path on the homepage (a non-technical reader gets stack and profile in ~40 seconds). Every 42
graduate has the same repository list; depth is the only differentiator available.

**Language:** English only. Bilingual is a maintenance tax paid on every project added forever.

**Role in the wider identity:** this is the canonical public hub. GitHub profile README shrinks to a
few lines plus a link. CV stays a linked/downloadable PDF — v1 does **not** rebuild or integrate the
existing CV generation system. (Housekeeping: the LinkedIn URL in the profile README is currently
malformed and broken.)

---

## 2. Product decisions

| Decision | Choice |
|---|---|
| Primary audience | Engineer/CTO depth, recruiter fast-path layered on top |
| Language | English only |
| Role | Canonical hub; CV is a linked PDF artifact |
| Hierarchy | 5 featured case studies + a filterable catalogue |
| Discovery | Domain as primary filter; technology tags clickable; context as badges |
| Visitor action | Read. Email + LinkedIn + GitHub + CV in footer. **No contact form** |
| Analytics | Cookieless (Cloudflare Web Analytics) — no consent banner. Not launch-critical |
| Interactivity | **v1-blocking.** At least one genuinely interactive project demo |

**No contact form** — it needs a form service, spam protection and a GDPR notice, to deliver an email
that an obfuscated `mailto:` delivers anyway. **No GA4** — it drags a cookie banner onto a portfolio,
which is a poor first impression.

---

## 3. Content strategy

Content is **first-class project work**, not a final chore. The written material is roughly 60% of
this project; the site is 40%. Three of the strongest repositories (`cub3d`, `philosophers`,
`push_swap`) currently have **no README at all**.

### 3.1 Featured set — provisional, with gates

Locked (4):

| Project | Carries |
|---|---|
| **Professional work** (private) | Production systems, user management, DB migrations, cloud migration, storage architecture |
| **ft_transcendence** | Shipped a real system — Fastify, JWT + 2FA, SQLite, nginx, Docker, Prometheus/Grafana. Team project, contribution already isolated |
| **minishell** | Processes, pipes, `fork`/`exec`, signals, parsing. C at depth. 100 commits |
| **Fract-ol** | Complex math, render loop — **the playable one** |

**Slot 5 — recommended, pending confirmation. Not locked.**

| Candidate | Written material | Media needed | Signal | Content cost |
|---|---|---|---|---|
| **42-binary-security** ← recommended | 12,469 words, done | none (code excerpts) | unfakeable low-level depth | ~600 words of synthesis |
| `inception` | 5.6k README | must re-run stack for Grafana shots | infra — duplicates the professional case study | medium |
| `cub3d` | none | must boot Linux at 42 | graphics — Fract-ol already claims it | high |

Recommendation: **42-binary-security** (Snow Crash + Rainfall + Override, presented as **one**
grouped body of work) — vulnerability analysis, memory/process behaviour, exploitation.

Recommended over `inception` and `cub3d` because it is the only candidate adding a signal nothing else
covers, it needs no media production, and its material is already written: **12,469 words across 45
files, 39 levels**, plus original tooling (`pattern_generator.py`, `exploit.py`, `shellcode.s`,
`xor_cipher.c`, `decrypt.c`, `race.sh`). Coverage includes ret2libc, format-string GOT overwrites,
heap exploitation, shellcode under `ptrace`/syscall monitoring, x86→x86-64 and race conditions. Its
README already handles ethical framing and redacts challenge flags. Cost to feature: ~600 words of
synthesis on top of existing content.

**Open gates (deliberately not decided now):**

- **Slot 5 itself awaits confirmation.** The comparison above is input to that decision, not the
  decision.

- `inception` → promotes to featured **if** NDA review guts the professional case study of its
  infrastructure content. Otherwise it stays catalogue: featuring both duplicates the cloud/infra
  claim, and duplicated claims read as padding.
- `cub3d` → promotes to featured **when** its WASM port lands. Until then it is a catalogue entry
  with strong media. Featuring it now would attach a visible promise to it.
- The **final featured set is gated on the media inventory** (§3.4). It is not fixed until that
  inventory is known.

**Embedded (`Piscine_42_embededd`) is explicitly not featured.** It comes from a piscine that was not
completed, and embedded development is far from the targeted roles. Catalogue only, and only if the
material is strong enough.

### 3.2 Catalogue (~12–15 entries)

`cub3d`, `inception`, `camagru42`, `philosophers`, `push_swap`, `libasm`, `Piscine_42_embededd`,
`svg-drawing-timeline`, `tiny_tickets`, `rag-search-engine`, `cultur_tour`, `focus`, `blackbox`,
`dev-env`, `job-skills-analyzer`.

### 3.3 Cut entirely from the site

`ft_printf`, `Get_next_line`, `minitalk`, `exam42`, `adventofcode`, `Homework`, `helloworld`,
`git_test`, `odin-recipes`, `HTML_CSS`, `Spoon-Knife`, `css-exercises`, `problems`,
`bootcamp_python`, `python-bootcamp-42ai`, `p5_js_formation`, `javascript_work`, `cs50-sauvegarde`,
`Transcendance_MVP`, `camagru`/`camagru_php` (superseded by `camagru42`), `Inception-in-VM`
(superseded), `OpenclassroomsProject`, `obsidian42`, `ressources`, `Project_Template`, `genCal`,
`asteroid`, `bookbot`, `rag42`, `hackaton-rag`, `craftai-iris-demo`, `base_for_music_app`, `CV`.

Cutting these is itself a signal of judgment. A curated 15 beats an undifferentiated 40.

### 3.4 Media inventory — open action

Required before the featured set is final:

- [ ] `cub3d` — any existing screenshots? (repo has none; `doc/`, 6 `.xpm` textures and 3 finished
      maps exist, so capture is straightforward on a Linux machine)
- [ ] ATmega328P board — photos/video, or re-shootable?
- [ ] `minishell` — **asciinema** recording of pipes/heredocs/signals working. More convincing than
      screenshots, embeds as static assets
- [ ] `inception` — Grafana dashboard screenshots; does the stack still `docker compose up`?
- [ ] `camagru42` — screenshots
- [ ] Professional work — what is publishable at all under NDA

Missing media is a **content-production task, not an architectural blocker**. Nothing in the
architecture depends on it.

### 3.5 Writing

- **400–800 words** per featured case study. Concise beats exhaustive.
- Personal observation and what was actually learned must be present. **Voice must survive** — a
  portfolio that reads as generated is worse than a thin one.
- Process: build the shell against **one complete real case study** (`ft_transcendence` — its
  existing README is ~80% of the text) so the content model is validated by real content, never
  lorem ipsum. Then draft the rest from repository inspection, with facts corrected and voice
  rewritten by hand.

### 3.6 Professional work — confidentiality boundary

Depth level: **sanitized architecture.** A component diagram with generic names, the specific
problems solved (migration strategy, storage layout), decisions and trade-offs. **Zero code, zero
private repository access.**

Rejected: re-authored "illustrative" code snippets — they blur the line between re-authored and
pasted, and create a rewriting chore.

⚠️ **Employment contract / NDA must be reviewed before publishing, including the sanitized version.**

---

## 4. Visual / UX decisions

**Chosen direction: variant D** — validated in `prototypes/homepage-prototype.html?variant=D`
(see §5.5 on that file's status). D combines a persistent sidebar shell with a
positioning-led hero. Variants A, B and C were explored and rejected.

### 4.1 Principles

- **Clean and minimal.** Restrained typography, near-monochrome, fast. The projects and the
  interactive demos supply the personality — not decorative UI.
- Explicitly rejected: the terminal/mono aesthetic (a cliché in this cohort), the dashboard/admin
  aesthetic, decorative gradients, and motion without functional meaning.
- The current GitHub profile README — typing-SVG banner, ~30 shield badges — is the anti-pattern
  this must beat.
- Mobile-legible. Accessible. Fast with no obvious performance problems — **no hard Lighthouse
  score gate**; publication is not delayed to chase a number.
- Not in v1: dark-mode toggle, search, blog, i18n.

### 4.2 Layout — the chosen shell

- **Persistent sidebar on desktop.** Identity and the recruiter fast-path stay on screen at all
  times rather than scrolling away.
- **Sidebar collapses into a compact top header on smaller screens.** Identity left, CV and links
  right; domain facets become a horizontally scrolling chip row.
- **CV is the primary action** — the one solid button in the interface.
- **GitHub / LinkedIn / Email are secondary editorial links** — underlined text, not stacked
  buttons. The sidebar must not read as an admin panel.
- **Portrait photo** as a small, restrained identity element in the sidebar/header. It humanises
  the page; it is **not** a large hero portrait and must not compete with the project-first layout.
  Canonical path `public/images/profile/thomas.jpg`.

### 4.3 Hero

- **Large, positioning-led hero** built on: *"I work close to the machine and close to the product."*
  This is the visual anchor of the page, not a small heading above a table.
- **The first featured project may begin below the fold.** The hero is allowed to carry the first
  impression — that trade was made deliberately when D was chosen.

### 4.4 Colour semantics — teal is strict

One accent, derived from the turquoise in Fract-ol's `get_color_psyche` palette
(`srcs/graphics.c`, `72,209,204`), darkened for contrast. It carries exactly one meaning:

- **Allowed:** emphasis on *"close to the machine"* in the positioning statement.
- **Allowed:** on project UI, teal means **runnable / interactive** — a `wasm` or `embed` demo.
- **Forbidden:** generic decorative teal. No teal borders, dividers, hovers, icons or headings that
  do not mean "you can run this."

Everything else is greyscale. A visitor should be able to learn the colour's meaning once and
trust it everywhere.

### 4.5 Project presentation

- **Featured projects are visually decompressed** — dedicated media space, full description, room
  to breathe. They must read as important, not as pinned rows in a database.
- **Featured media must be real** — screenshots, recordings or purpose-built visuals. **Empty
  placeholder boxes are not acceptable at launch**; D leans on these images harder than the other
  variants did. This raises the stakes on the §3.4 media inventory.
- **The catalogue stays compact, dense, scalable and filterable** — a table/index that absorbs new
  projects without a redesign.
- **No machine → system → service → product depth model.** Variant C's depth axis was rejected;
  `depth` is not part of the project schema (§5.2).

---

## 5. Technical architecture

### 5.1 Stack: Astro

Chosen for the maintenance requirement. **Content collections give typed, schema-validated
frontmatter** — adding a project with a missing field or a mistyped domain **fails the build**. That
is the single largest long-term win available, and it is built in rather than assembled. MDX is
native; ~0 JS ships on content pages; React components render as islands where genuinely needed.

Next.js was considered and rejected: MDX content needs extra machinery, and it ships a React runtime
to pages that are text. The portfolio does not need to be Next.js evidence — the projects carry that.
11ty/hand-rolled was rejected because the WASM island would be hand-written and React lost entirely.

### 5.2 Content schema

One MDX file per project, one validated schema:

```yaml
title, slug, summary        # summary = 1 sentence — card + <meta description>
domain: systems | web | infra | security | ai | graphics
tech: [C, Docker, ...]      # clickable tag chips
context: professional | 42 | personal
team: solo | team
period: "2024-01"
featured: true | false
featuredOrder: <int>        # optional; add only when ordering is actually needed
demo:
  type: wasm | embed | media | diagram | none
  # + type-specific fields
links: { repo?, live? }
cover: <image>
```

Deliberately **not** included: `status`, `highlights[]`, `role`, `metrics[]`. Every field added is a
field to fill in for every future project forever. Add one the day it is actually missed.

`featured` is a boolean so promoting `cub3d` later is a one-word diff. `featuredOrder` is optional
and stays unused until ordering matters — never derive order accidentally from filenames or dates.

**No `depth` field.** Variant C's machine → system → service → product model was explored and
rejected (§4.5): it forces a judgment call per project, and projects like `camagru42` and
`rag-search-engine` have no defensible position on that axis.

### 5.3 Repository layout

- Portfolio site + content + **vendored WASM artifacts** in this repository.
- Fract-ol C changes live **upstream in the `Fractol` repository, on a dedicated `wasm` branch**.
  `main` keeps the submitted 42 version untouched — it is a graded artifact.
- Build artifacts are committed, produced by an explicit `Makefile` target in the `Fractol` repo.

```
src/
  components/    # sidebar, hero, featured entry, catalogue table, tags
  layouts/       # shared page shell
  pages/         # routes
  content/       # project MDX + collection schema
  styles/        # tokens + global base
public/
  images/profile/    images/projects/    demos/   # vendored WASM later
docs/            # this document
prototypes/      # throwaway exploration — see 5.5
```

### 5.4 Implementation principles

- **Astro-native patterns only.** Layouts for the shared shell, components for repeated UI,
  content collections + MDX for project content, client-side JS only where interaction genuinely
  requires it (`client:visible` on the Fract-ol island, and nothing else by default).
- **Not** an MVC application, **not** a state-management architecture, **not** a backend. This is a
  mostly-static site and the structure must stay legible to someone opening it in a year.
- Design tokens live in one stylesheet. Components consume tokens; no hardcoded hex values in
  component files.

### 5.5 The prototype is throwaway — do not promote it

`prototypes/homepage-prototype.html` is **exploratory code only**. It was written under prototype
constraints: no tests, no error handling, one file, inline data, duplicated markup across four
variants.

**It must not be evolved or refactored into production.** The production site is a clean Astro
reimplementation with a maintainable component and content structure. The prototype's value is the
*decision* it captured — variant D — not its code. Keep it for reference and comparison; never
import from it.

---

## 6. Interactive demo strategy

### 6.1 Demo tiers

Each project declares exactly one `demo.type`; the site renders the matching component.

| Tier | Type | Used by |
|---|---|---|
| 1 | `wasm` — real compiled C, canvas + controls | **Fract-ol** |
| 2 | `embed` — existing web app, iframe or native component | `svg-drawing-timeline` (post-v1) |
| 3 | `media` — screenshots / screen recording / asciinema | minishell, cub3d, camagru42, inception |
| 3b | `media` **with annotated code excerpts** — vulnerable source, exploit, reasoning | 42-binary-security (if featured) |
| 4 | `diagram` — architecture diagram, no code | professional work |
| 5 | `none` — card + repo link | most of the catalogue |

v1 builds tiers 1, 3, 4 and 5. Tier 2 is left as a stub (~1h of work when wanted). A generic
"run anything in a sandbox" engine is **explicitly rejected** — five concrete cases beat one
speculative abstraction. Nothing chosen requires a server, which is what keeps hosting static and free.

### 6.2 Fract-ol port approach

**Extract a reusable headless C rendering core** — not an emscripten MiniLibX emulation, and
absolutely not a JavaScript reimplementation. The point of the demo is that visitors interact with the
original C.

Findings from source inspection (799 LOC, `srcs/` only):

- MiniLibX surface is **13 call sites**, all in `main.c` and `rendering.c`.
- `img_pix_put` writes `*(int*)(addr + y*line_len + x*bpp/8)` — pointing `addr` at a `malloc`'d RGBA
  buffer exposed through `Module.HEAPU8` and drawn with `putImageData` requires **no change to the
  rendering code**.
- No pthreads, no direct X11, no file I/O.
- **The WASM target needs zero libft.** The only libft calls (`ft_strncmp`, `ft_putstr_fd`) are in
  `main.c`'s argv parsing, which this approach deletes and replaces with an exported
  `init(mode, c_re, c_im)`. `ft_atodbl` is original code in `srcs/utils.c`.
- Keys are X11 keysyms (`0xff51`…) — the browser build does not reproduce them (see 6.4).

The same core then drives both the native MiniLibX application and the browser canvas — which is
itself the engineering story the case study tells.

**Known performance problem:** `mlx_loop_hook(render)` recomputes all 1080×960 pixels every frame at
up to 800 iterations per pixel, single-threaded scalar — roughly 50–200M double operations per frame.
The fix (render on demand behind a dirty flag, rather than every tick) is the "what I would do
differently" paragraph.

### 6.3 The spike — ✅ RESOLVED, passed

Completed on the `wasm` branch of the `Fractol` repository (3 commits, clean tree). The abort path
was never needed; `svg-drawing-timeline` does not have to carry the interactive requirement.

**Result: 800×600 at 200 iterations, Chrome on an M-series laptop.** Budget was ≤~100ms.

| view | iterations | median render |
|---|---|---|
| mandelbrot, default | 200 | **47.1 ms** |
| julia, default | 200 | 8.2 ms |
| burning_ship, default | 200 | 58.7 ms |
| mandelbrot, deep zoom | 757 | 643 ms |
| same view, clamped preview | 60 | 36.3 ms |
| `putImageData` | — | 0.10 ms |

**Escape-ladder rung 2 is in the design, not in reserve:** the demo renders a 60-iteration clamped
preview during interaction and a full-quality frame ~140ms after input stops. `zoom_in()` ramps
`nb_iter` toward `MAX_ITER` 800, so deep views cost ~13× the default.

**What was actually built.** Seven original sources compile **unchanged** — `fractals.c`,
`colors.c`, `graphics.c`, `zoom.c`, `movement.c`, `rendering.c`, `keys.c`. Only `main.c`, `input.c`
and `render()` are replaced, by ~150 lines of glue in `wasm/fractol_wasm.c`. Two guard edits to the
originals (`#ifndef` on the window dimensions, `#ifndef __EMSCRIPTEN__` on `render()`). MiniLibX is
not emulated: `t_img` is plain data, so the glue points `img.addr` at a static buffer.
Palette selection, panning, the Julia nudges and the five Julia presets all still execute the
original C, dispatched through `srcs/keys.c` via one `fw_key(int keysym)` export.

**Artifacts:** `wasm/fractol.js` (8.9 KB) + `wasm/fractol.wasm` (18.7 KB) — **27.6 KB total**,
committed, so the demo runs without emscripten. Rebuild with `sh wasm/build.sh`
(`emcc -O3 -flto`; `-flto` is worth ~1.7× because it devirtualizes the per-pixel `get_color` and
per-iteration iteration callback). `W=` / `H=` override the canvas size at build time.

**Public API:** `fw_init`, `fw_render`, `fw_zoom`, `fw_pan_pixels`, `fw_key`, `fw_julia_r`,
`fw_julia_i`, `fw_iter`, `fw_set_iter`, `fw_zoom_level`.

⚠️ **The `wasm` branch is local only** — `origin` has just `main`. Push it before the portfolio
vendors anything from it.

### 6.4 Fract-ol browser UX

Implemented in the spike: cursor-centred wheel zoom, drag to pan, arrow-key stepping, palettes,
Julia nudges and presets, and `?c=real,imag` to open Julia on a given constant.

**Two deliberate divergences from the original X11 UX**, both forced and both worth a paragraph in
the case study:

- **Palettes moved from F1–F6 to digits 1–6.** F3/F5/F6 are browser-owned and `preventDefault`
  cannot reliably reclaim them. JS translates digits to the same keysyms, so the C is unchanged.
- **Key matching uses `event.code`, not `event.key`.** The original resolves keys through
  `XkbKeycodeToKeysym(..., group 0)` — the *first configured* X layout, ignoring the active one. On
  AZERTY that scatters W/A/S/D. `event.code` gives one rule and an ergonomic cluster on both layouts.

**Revised: click-to-start is no longer required.** That decision assumed a few-hundred-KB module;
the real artifacts are **27.6 KB** and the first frame is ~47ms. The demo can initialise on view
(`client:visible`) without hurting page load. Still keep a **static preview image as the fallback**
for no-WASM and `prefers-reduced-motion`.

**Still needed before this demo ships** (from the spike's own "not done" list):

- **Touch events** — currently none, so the demo is inert on mobile. This is the largest gap.
- Canvas resize handling.
- Colour banding at `iter > MIN_ITER` (the `t_uint8` cast in `get_color_*` wraps).
- A Web Worker so a deep-zoom full-quality pass cannot block the main thread.
- Optional: click-drag mini-Mandelbrot picker for the Julia constant; fuller URL view state.

Performance was measured on an M-series laptop only. **Mobile is unmeasured** — worth one check
before launch, though the iteration clamp already bounds the interactive cost.

---

## 7. Hosting & deployment

| | |
|---|---|
| Host | **Cloudflare Pages** — free, unlimited bandwidth, static, per-branch preview URLs |
| Registrar | Cloudflare Registrar — wholesale pricing, no renewal markup |
| Domain | **`thomasjoyeux.dev`** (verified unregistered via RDAP) |
| Analytics | Cloudflare Web Analytics — cookieless, no consent banner. Not launch-critical |

Vercel is technically equivalent for this workload. GitHub Pages was rejected — weakest header
control and no preview deployments.

⚠️ **Availability ≠ standard price.** `.dev` is Google Registry and short or dictionary-word names
carry premium tiers with permanently elevated renewals. Confirm the actual checkout price before
buying. `thomasjoyeux.dev` is long enough that this is very unlikely to bite.

**Buying the domain is not a prerequisite for prototyping.** Deploy to a preview URL; connect the
domain before launch. Nothing chosen needs a server, so hosting stays free.

---

## 8. MVP — definition of done

v1 ships when all of the following are true:

1. Homepage — positioning line, featured cards, links, CV
2. Catalogue — ~12–15 projects, domain filter, clickable tech tags, context badges
3. **Three complete case studies in the author's voice**, 400–800 words each:
   `ft_transcendence`, professional work, Fract-ol
   *(the other featured projects — including whichever wins slot 5 — need convincing descriptions
   and real media, not full case studies, at launch)*
4. **Fract-ol WASM demo integrated into the site**, with static fallback and working touch input
   *(the §6.3 spike passed — the rendering core is done; what remains is integration)*
5. Remaining featured projects have **real media, not placeholders**, and convincing descriptions
6. Deployed, own domain connected, mobile-legible, accessible, fast — no hard Lighthouse gate

### Build order

1. ~~Fract-ol WASM spike~~ — ✅ **done**, passed (§6.3).
2. ~~Astro shell~~ — ✅ **done**. Layout, components, content collection, 20 project entries.
3. **Fract-ol demo integration** — ✅ mostly done. `wasm` branch pushed; artifacts vendored to
   `public/demos/fractol/`; `FractolDemo` renders on the Fract-ol project page, lazily. **Touch
   input, a static fallback image and resize handling remain** (§6.4).
4. Media inventory (§3.4) — in parallel; it gates the final featured set, and variant D has no
   graceful degradation for missing featured media.
5. First real case study (`ft_transcendence`), validating the content model against real prose.
6. Remaining content and media.
7. Domain, deploy.

---

## 9. Post-v1 backlog

In rough priority order:

1. **`svg-drawing-timeline` as `embed`** — ~1h, a second interactive project almost free
2. **`cub3d` WASM port** — highest wow, highest cost. Needs `.xpm` decoding and texture sampling on
   top of everything the Fract-ol port establishes — and that port is now a proven template, which
   lowers the risk considerably. Auto-promotes cub3d to featured
3. Fract-ol demo polish: colour banding fix, Web Worker for deep zooms, mini-Mandelbrot Julia
   picker, URL-shareable view state (§6.4)
4. READMEs for `cub3d`, `philosophers`, `push_swap` (currently none)
5. **Credentials area** — see below
6. Dark-mode toggle
7. CI-built WASM (emsdk in GitHub Actions) — **only** once artifacts are actually rebuilt often enough
   to be annoying. Vendored artifacts are correct until then
8. Search, blog, i18n — only on real demand

### 9.1 Credentials — idea only, not scheduled

A **very small** area for selected certifications or awards (e.g. AWS). Recorded so it isn't
forgotten, not planned.

Constraints if it is ever built:

- **The portfolio stays project-first.** Credentials are secondary and must never compete with
  featured work for position or weight.
- **Not a CV section.** No education history, no employment timeline — that is what the CV PDF is for.
- **Not a wall of badges.** The GitHub profile README's ~30 shields is the exact failure mode
  (§4.1). Plain text, a handful of entries, no vendor logos.
- Most likely home: a quiet block low in the sidebar, or a short list near the footer. Not the hero,
  not above the fold, not its own top-level page.
- **Selected**, not complete. If the list needs a "show more", it is already too long.

---

## 10. Open items

| Item | Owner | Blocks |
|---|---|---|
| **Slot 5 choice** — 42-binary-security / inception / cub3d (§3.1) | Thomas | Featured set |
| **Push the `Fractol` `wasm` branch** — local only today | Thomas | Vendoring the demo artifacts |
| Media inventory (§3.4) | Thomas | Final featured set |
| NDA / contract review for the professional case study | Thomas | Publishing that case study; `inception` promotion gate |
| Confirm `thomasjoyeux.dev` checkout price | Thomas | Purchase only — not prototyping |
| Real CV PDF at `/thomas-joyeux-cv.pdf`, real contact email | Thomas | Launch |
| Fix malformed LinkedIn URL in profile README | Thomas | Nothing |

~~Fract-ol spike outcome~~ — ✅ resolved, passed (§6.3).
