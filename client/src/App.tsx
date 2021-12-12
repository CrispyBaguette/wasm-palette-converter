import React from "react";
import ImageInput from "./ImageInput";
import ImageOutput from "./ImageOutput";
import Ditherer from "./lib/Ditherer";
import ImagePreview from "./ImagePreview";
import Header from "./Header";

enum AppState {
  NO_IMAGE,
  IMAGE_LOADED,
  IMAGE_PROCESSED,
}

function App() {
  const [baseImage, setBaseImage] = React.useState<Uint8ClampedArray>();
  const [ditheredImage, setDitheredImage] = React.useState<Uint8ClampedArray>();
  const [appState, setAppState] = React.useState<AppState>(AppState.NO_IMAGE);

  const handleImageSubmit = async (data: Uint8ClampedArray) => {
    setBaseImage(data);
    setAppState(AppState.IMAGE_LOADED);

    try {
      const ditheredImage = await new Ditherer().dither(data);
      setDitheredImage(ditheredImage);
      setAppState(AppState.IMAGE_PROCESSED);
    } catch (e) {
      console.error(e);
      window.alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="bg-nord-6 text-nord-0 min-h-screen">
      <Header />
      <main className="container mx-auto">
        <article className="max-w-prose mx-auto pb-5 px-2">
          <h1 className="text-3xl text-center pb-3">
            Go+Wasm image dithering tool
          </h1>
          <aside className="text-xl text-center pb-3">
            Featuring the Nord Color Palette
          </aside>
          <p>
            Load an image, click Go and wait (potentially for a while) for the
            image to be processed using the Floyd-Steinberg algorithm.
          </p>
          <p>
            WebAssembly might run out of memory when processing larger images.
          </p>
        </article>
        <ImageInput onImageSubmit={handleImageSubmit}></ImageInput>
        {appState === AppState.IMAGE_LOADED && (
          <ImagePreview imageData={baseImage as Uint8ClampedArray} />
        )}
        {appState === AppState.IMAGE_PROCESSED && (
          <ImageOutput imageData={ditheredImage as Uint8ClampedArray} />
        )}
      </main>
    </div>
  );
}

export default App;
