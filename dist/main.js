(async () => {
  // Load  element references
  const fileInput = document.getElementById("source-image");
  const btn = document.getElementById("go-btn");

  // Setup Wasm stuff
  const go = new Go();
  vm = await WebAssembly.instantiateStreaming(
    fetch("/main.wasm"),
    go.importObject
  );
  go.run(vm.instance);

  // Setup event listener
  btn.addEventListener("click", async () => {
    // Clear image
    outputElement = document.getElementById("output");
    outputElement.src = "";

    // Check if a file was selected
    if (fileInput.files.length === 0) {
      alert("No file selected");
      return;
    }
    reader = new FileReader();
    reader.readAsArrayBuffer(fileInput.files[0]);
    reader.Read;
    reader.onloadend = async (evt) => {
      if (evt.target.readyState === FileReader.DONE) {
        const array = new Uint8Array(evt.target.result);
        // Wasm magic happens here
        ditheredImageData = await DitherNord(array);
        document.getElementById("output").src =
          "data:image/png;base64," + ditheredImageData;
      }
    };
  });
})();
