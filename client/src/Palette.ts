class Palette {
  colors: string[];
  label: string;

  constructor(label: string, colors: string[]) {
    if (colors.length < 2) {
      throw new Error("Palette requires at least two colors.");
    }

    this.label = label;
    this.colors = colors;
  }
}

const nord = new Palette("Nord", [
  "2e3440",
  "3b4252",
  "434c5e",
  "4c566a",
  "d8dee9",
  "e5e9f0",
  "eceff4",
  "8fbcbb",
  "88c0d0",
  "81a1c1",
  "5e81ac",
  "bf616a",
  "d08770",
  "ebcb8b",
  "a3be8c",
  "b48ead",
]);

const monokai = new Palette("Monokai", [
  "2e2e2e",
  "797979",
  "d6d6d6",
  "e5b567",
  "b4d273",
  "e87d3e",
  "9e86c8",
  "b05279",
  "6c99bb",
]);

const grayScale1bit = new Palette("Gray Scale 1 bit (Black & White)", [
  "000000",
  "ffffff",
]);

const grayScale2bits = new Palette("Gray Scale 2 bits", [
  "000000",
  "676767",
  "b6b6b6",
  "ffffff",
]);

const grayScale2bitsGamma = new Palette("Gray, 4 shades, gamma-corrected", [
  "000000",
  "888888",
  "b6b6b6",
  "e0e0e0",
]);

// https://draculatheme.com
const dracula = new Palette("Dracula", [
  "282a36",
  "44475a",
  "f8f8f2",
  "6272a4",
  "8be9fd",
  "50fa7b",
  "ffb86c",
  "ff79c6",
  "bd93f9",
  "ff5555",
  "f1fa8c",
]);

const palettes = [
  nord,
  monokai,
  grayScale1bit,
  grayScale2bits,
  grayScale2bitsGamma,
  dracula,
];

palettes.sort((a, b) => a.label.localeCompare(b.label));

export { palettes };
export default Palette;
