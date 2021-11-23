importScripts("./wasm_exec.js");

if (!WebAssembly.instantiateStreaming) {
  WebAssembly.instantiateStreaming = async (resp, importObject) => {
    const source = await (await resp).arrayBuffer();
    return await WebAssembly.instantiate(source, importObject);
  };
}

// Create promise to handle Worker calls whilst
// module is still initialising
let wasmResolve;
const wasmReady = new Promise((resolve) => {
  wasmResolve = resolve;
});

const go = new self.Go();

addEventListener(
  "message",
  async (e) => {
    const { eventType, eventData, eventId } = e.data;

    if (eventType === "INITIALISE") {
      const instantiatedSource = await WebAssembly.instantiateStreaming(
        fetch(eventData),
        go.importObject
      );
      go.run(instantiatedSource.instance);

      // Go does nor exposes the exports in the instantiated module :(((
      const methods = ["DitherNord"];
      wasmResolve(methods);
      postMessage({
        eventType: "INITIALISED",
        eventData: methods,
      });
    } else if (eventType === "CALL") {
      await wasmReady;
      try {
        const method = self[eventData.method];
        const result = await method.apply(null, eventData.arguments);
        self.postMessage({
          eventType: "RESULT",
          eventData: result,
          eventId: eventId,
        });
      } catch (e) {
        console.error(e);
        self.postMessage({
          eventType: "ERROR",
          eventData:
            "An error occured executing WASM instance function: " +
            error.toString(),
          eventId: eventId,
        });
      }
    }
  },
  false
);
