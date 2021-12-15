import Palette from "./Palette";

interface PalettePreviewProps {
  palette: Palette;
}

function PalettePreview({ palette }: PalettePreviewProps) {
  // Build a linear-gradient css string from the palette colors, evenly spaced with hard stops
  const paletteLength = palette.colors.length;
  const bandSize = 100 / paletteLength;
  let gradientPercent = 0;
  let gradientString = `linear-gradient(90deg, `;
  for (let i = 0; i < paletteLength; i++) {
    const color = palette.colors[i];
    gradientString += `#${color} ${gradientPercent}%, #${color} ${
      gradientPercent + bandSize
    }%`;
    gradientPercent += bandSize;

    if (i !== paletteLength - 1) {
      gradientString += `, `;
    } else {
      gradientString += `)`;
    }
  }

  return (
    <div
      className="h-5 my-2 border-solid border-2 border-nord-0"
      style={{ background: gradientString }}
    ></div>
  );
}

export default PalettePreview;
