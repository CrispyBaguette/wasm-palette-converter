const fileInput = document.getElementById("source-image");
const btn = document.getElementById("go-btn");
const output = document.getElementById("output");
const outputWrapper = document.getElementById("output-wrapper");

function wasmWorker(modulePath) {
  // Create an object to later interact with
  const proxy = {};

  // Keep track of the messages being sent
  // so we can resolve them correctly
  let id = 0;
  let idPromises = {};

  return new Promise((resolve, reject) => {
    const worker = new Worker("worker.js");
    worker.postMessage({ eventType: "INITIALISE", eventData: modulePath });
    worker.addEventListener("message", function (event) {
      const { eventType, eventData, eventId } = event.data;

      if (eventType === "INITIALISED") {
        const methods = event.data.eventData;
        methods.forEach((method) => {
          proxy[method] = function () {
            return new Promise((resolve, reject) => {
              worker.postMessage({
                eventType: "CALL",
                eventData: {
                  method: method,
                  arguments: Array.from(arguments), // arguments is not an array
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

    worker.addEventListener("error", function (error) {
      reject(error);
    });
  });
}

let workerResolve;
const wasmReady = new Promise((resolve) => {
  workerResolve = resolve;
});

let workerProxy;
wasmWorker("./main.wasm").then((w) => {
  workerProxy = w;
  workerResolve();
  btn.removeAttribute("disabled");
});

btn.addEventListener("click", async () => {
  // Clear image
  output.src = "";

  // Check if a file was selected
  if (fileInput.files.length === 0) {
    alert("No file selected");
    return;
  }
  const reader = new FileReader();
  reader.readAsArrayBuffer(fileInput.files[0]);
  reader.onloadend = async (evt) => {
    if (evt.target.readyState === FileReader.DONE) {
      const imageData = new Uint8Array(evt.target.result);
      const ditheredImage = await workerProxy.DitherNord(imageData);

      const outputValue = `data:image/png;base64,${ditheredImage}`;
      output.src = outputValue;
      outputWrapper.href = outputValue;
    }
  };
});
