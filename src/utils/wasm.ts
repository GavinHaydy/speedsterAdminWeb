let loaded = false;

export async function initWasm() {
  if (loaded) return;

  const go = new window.Go();

  const result = await WebAssembly.instantiateStreaming(fetch('/wasm/main.wasm'), go.importObject);

  await go.run(result.instance);

  loaded = true;
}
