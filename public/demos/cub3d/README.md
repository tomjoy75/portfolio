# Vendored build artifacts — do not edit

`cub3d.js`, `cub3d.wasm`, `tex/` and `maps/` are generated output, copied
verbatim from the `wasm` branch of https://github.com/tomjoy75/cub3d.

Source of truth: `wasm/cub3d_wasm.c` + `wasm/mlx_shim.c` + the unchanged
`srcs/*.c` in that repo. That branch descends from `submitted`, not `main` —
`main` predates the hand-in and is missing the wall texture orientation fix.

## Rebuilding

```sh
git clone -b wasm https://github.com/tomjoy75/cub3d.git
cd cub3d
python3 wasm/textures.py                # .xpm -> web/tex/*.png, capped at 256px
sh wasm/build_web.sh                    # needs emscripten
cp -R web/cub3d.js web/cub3d.wasm web/tex web/maps <portfolio>/public/demos/cub3d/
```

`fallback.png` is a frame from the renderer itself, not an illustration:

```sh
sh wasm/build.sh                        # the build that embeds its assets
node wasm/shot.mjs bonus_futur_du_retour_de_l_anterieur 2 0
```

The render size is compiled in (`W=800 H=600`). Changing it means a rebuild
**and** updating `DEMO_WIDTH` / `DEMO_HEIGHT` in
`src/components/demos/Cub3dDemo.astro`.

## Why the textures are PNG and not raw

The twenty `.xpm` sources total 25 MB, and 51 MB as raw RGBA. Downscaled to
256px on the long edge — the most a wall column can resolve — and encoded as
PNG they are 402 KB, decoded by the browser rather than by C. Embedding the raw
buffers into the binary instead produces a 26 MB `.wasm`.

Vendored rather than built in CI for the same reason as Fract-ol: the C changes
roughly never. See DIRECTION.md §6.3 and the §9 backlog item on CI-built WASM.
