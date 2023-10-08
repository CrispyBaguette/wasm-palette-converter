import React from "react";
import ImageInput from "./ImageInput";
import ImageOutput from "./ImageOutput";
import Ditherer from "./lib/Ditherer";
import ImagePreview from "./ImagePreview";
import Header from "./Header";
import Palette from "./Palette";

enum AppState {
  NO_IMAGE,
  IMAGE_LOADED,
  IMAGE_PROCESSED,
}

function App() {
  const [baseImage, setBaseImage] = React.useState<Blob>();
  const [ditheredImage, setDitheredImage] = React.useState<Blob>();
  const [appState, setAppState] = React.useState<AppState>(AppState.NO_IMAGE);

  const handleImageSubmit = async (data: Blob, palette: Palette) => {
    setBaseImage(data);
    setAppState(AppState.IMAGE_LOADED);

    try {
      const imageArray = new Uint8ClampedArray(await data.arrayBuffer());
      const ditheredImage = await new Ditherer().dither(imageArray, palette);
      setDitheredImage(new Blob([ditheredImage], { type: "image/png" }));
      setAppState(AppState.IMAGE_PROCESSED);

      if ("umami" in window) {
        (window as any).umami.track("image processed");
      }
    } catch (e) {
      console.error(e);
      window.alert("Something went wrong. Please try again.");
      if ("umami" in window) {
        (window as any).umami.track("processing error");
      }
    }
  };

  return (
    <div className="bg-nord-6 dark:bg-nord-0 text-nord-0 dark:text-nord-6 min-h-screen">
      <Header />
      <main className="container mx-auto pb-5">
        <article className="text-xl leading-relaxed max-w-prose space-y-2 mx-auto pb-5 px-2">
          <h1 className="text-3xl text-center pb-3">
            Go+Wasm image dithering tool
          </h1>
          <p>
            Load an image, select a palette, click Go and wait for the image to
            be processed using the Floyd-Steinberg algorithm.
          </p>
          <p>
            The preview image is scaled using the nearest-neighbor algorithm,
            which might cause artifacts in some cases. Download the image for
            the best experience.
          </p>
        </article>
        <ImageInput onImageSubmit={handleImageSubmit}></ImageInput>
        {appState === AppState.IMAGE_LOADED && baseImage && (
          <ImagePreview imageData={baseImage} />
        )}
        {appState === AppState.IMAGE_PROCESSED && ditheredImage && (
          <ImageOutput imageData={ditheredImage} />
        )}
      </main>
    </div>
  );
}

export default App;
