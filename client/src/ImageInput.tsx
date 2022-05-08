import React, { FormEventHandler } from "react";
import Palette, { palettes } from "./Palette";
import PalettePreview from "./PalettePreview";
import PaletteSelect from "./PaletteSelect";

interface Props {
  onImageSubmit: (image: Blob, palette: Palette) => void;
}

function ImageInput({ onImageSubmit }: Props) {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [palette, setPalette] = React.useState<Palette>(palettes[0]);

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    if (
      !fileInputRef.current ||
      !fileInputRef.current.files ||
      fileInputRef.current.files.length === 0
    ) {
      return;
    }

    onImageSubmit(fileInputRef.current.files[0], palette);
  };

  const handlePaletteChange = (palette: Palette) => {
    setPalette(palette);
  };

  return (
    <form
      className="grid grid-cols-1 max-w-md mx-auto my-4 px-2"
      onSubmit={handleSubmit}
    >
      <label className="block">
        <span>Select an image:</span>
        <input
          type="file"
          accept="image/png, image/jpeg"
          ref={fileInputRef}
          className={
            "block " +
            "w-full " +
            "mt-1 " +
            "text-sm " +
            "text-nord-0 " +
            "dark:text-nord-5 " +
            "file:mr-4 " +
            "file:py-2 " +
            "file:px-4 " +
            "file:border-0 " +
            "file:text-sm " +
            "file:font-semibold " +
            "file:bg-nord-4 " +
            "dark:file:bg-nord-1 " +
            "file:text-nord-0 " +
            "dark:file:text-nord-5 " +
            "hover:file:bg-nord-5 " +
            "dark:hover:file:bg-nord-2"
          }
        />
      </label>
      <label>
        <span className="block">Select a color palette:</span>
        <PaletteSelect value={palette} onChange={handlePaletteChange} />
      </label>
      <PalettePreview palette={palette}></PalettePreview>
      <button
        type="submit"
        value="Go"
        className={
          "block " +
          "w-32 " +
          "mx-auto " +
          "mt-1 " +
          "py-2 " +
          "px-4 " +
          "text-sm " +
          "text-nord-0 " +
          "dark:text-nord-5 " +
          "bg-nord-4 " +
          "dark:bg-nord-1 " +
          "hover:bg-nord-5 " +
          "dark:hover:bg-nord-2"
        }
      >
        Go
      </button>
    </form>
  );
}

export default ImageInput;
