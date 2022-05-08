import React from "react";
import Palette, { palettes } from "./Palette";

interface PaletteSelectProps {
  value: Palette;
  onChange: (palette: Palette) => void;
}

function PaletteSelect({ value, onChange }: PaletteSelectProps) {
  const handlePaletteChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(palettes[parseInt(event.target.value)]);
  };

  // Index of the palette in the palettes array, used as the value of the select
  const valueIndex = palettes.findIndex((p) => p === value);

  const paletteOptions = palettes.map((palette, index) => (
    <option key={index} value={index}>
      {palette.label}
    </option>
  ));

  return (
    <select
      value={valueIndex}
      onChange={handlePaletteChange}
      className={
        "form-select " +
        "dark:text-nord-5 " +
        "dark:bg-nord-1 " +
        "focus:ring-nord-7 " +
        "focus:border-nord-7 " +
        "block " +
        "w-full " +
        "mt-1"
      }
    >
      {paletteOptions}
    </select>
  );
}

export default PaletteSelect;
