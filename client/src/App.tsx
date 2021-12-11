import React, { useEffect } from "react";
import "./App.css";

function App() {
  const [imageSrc, setImageSrc] = React.useState("");
  const [displayOutput, setDisplayOutput] = React.useState(false);
  const fileInput = React.useRef<HTMLInputElement>(null);

  const handleClick = async () => {
    if (!fileInput.current) {
      return;
    }
    const workerProxy: any = await wasmWorker("main.wasm");

    setDisplayOutput(false);
    setImageSrc("");

    // Check if a file was selected
    if (fileInput.current.files!.length === 0) {
      alert("No file selected");
      return;
    }
    const reader = new FileReader();
    reader.readAsArrayBuffer(fileInput.current.files![0]);
    reader.onloadend = async (evt) => {
      if (evt.target!.readyState === FileReader.DONE) {
        const imageData = new Uint8Array(evt.target!.result as ArrayBuffer);
        const ditheredImage = await workerProxy.DitherNord(imageData);
        const outputValue = `data:image/png;base64,${ditheredImage}`;
        setImageSrc(outputValue);
        setDisplayOutput(true);
      }
    };
  };

  return (
    <div className="App">
      <input
        type="file"
        id="source-image"
        ref={fileInput}
        accept="image/png, image/jpeg"
      />
      <button id="go-btn" type="button" onClick={handleClick}>
        Go
      </button>
      <a id="output-wrapper" download="output.png" href={imageSrc}>
        <div className="container">
          <img
            id="output"
            alt="dithering output"
            src={imageSrc}
            style={{ display: displayOutput ? "block" : "none" }}
          />
        </div>
      </a>
    </div>
  );
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

export default App;
