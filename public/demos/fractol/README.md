# Vendored build artifacts — do not edit

`fractol.js` and `fractol.wasm` are generated output, copied verbatim from the
`wasm` branch of https://github.com/tomjoy75/Fractol.

Source of truth: `wasm/fractol_wasm.c` + the unchanged `srcs/*.c` in that repo.

## Rebuilding

```sh
git clone -b wasm https://github.com/tomjoy75/Fractol.git
cd Fractol && sh wasm/build.sh          # needs emscripten
cp wasm/fractol.js wasm/fractol.wasm <portfolio>/public/demos/fractol/
```

The canvas size is compiled in (`W=800 H=600` by default). Changing it means a
rebuild **and** updating `DEMO_WIDTH` / `DEMO_HEIGHT` in
`src/components/demos/FractolDemo.astro`.

Vendored rather than built in CI because the C changes roughly never — see
DIRECTION.md 6.3 and the §9 backlog item on CI-built WASM.
