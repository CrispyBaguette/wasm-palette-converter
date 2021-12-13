import Palette from "../Palette";

class Ditherer {
  async dither(
    image: Uint8ClampedArray,
    palette: Palette
  ): Promise<Uint8ClampedArray> {
    const worker: any = await wasmWorker("./main.wasm");
    let output: Uint8ClampedArray;
    try {
      output = await worker.dither(image, palette.colors);
    } finally {
      worker.terminate();
    }
    return output;
  }
}

function wasmWorker(modulePath: string) {
  // Create an object to later interact with
  const proxy: any = {};

  // Keep track of the messages being sent
  // so we can resolve them correctly
  let id = 0;
  let idPromises: any = {};

  return new Promise((resolve, reject) => {
    const worker = new Worker("./worker.js");
    proxy.terminate = () => worker.terminate();
    worker.postMessage({ eventType: "INITIALISE", eventData: modulePath });
    worker.addEventListener("message", function (event: any) {
      const { eventType, eventData, eventId } = event.data;

      if (eventType === "INITIALISED") {
        const methods = event.data.eventData;

        methods.forEach((method: any) => {
          proxy[method] = (...args: any[]) => {
            return new Promise((resolve, reject) => {
              worker.postMessage({
                eventType: "CALL",
                eventData: {
                  method: method,
                  arguments: Array.from(args),
                },
                eventId: id,
              });

              idPromises[id] = { resolve, reject };
              id++;
            });
          };
        });
        resolve(proxy);
        return;
      } else if (eventType === "RESULT") {
        if (eventId !== undefined && idPromises[eventId]) {
          idPromises[eventId].resolve(eventData);
          delete idPromises[eventId];
        }
      } else if (eventType === "ERROR") {
        if (eventId !== undefined && idPromises[eventId]) {
          idPromises[eventId].reject(event.data.eventData);
          delete idPromises[eventId];
        }
      }
    });

    worker.addEventListener("error", function (error: any) {
      reject(error);
    });
  });
}

export default Ditherer;
