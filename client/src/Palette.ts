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

const place = new Palette("r/place", [
  "be0039",
  "ff4500",
  "ffa800",
  "ffd635",
  "00a368",
  "00cc78",
  "7eed56",
  "00756f",
  "009eaa",
  "2450a4",
  "3690ea",
  "51e9f4",
  "493ac1",
  "6a5cff",
  "811e9f",
  "b44ac0",
  "ff3881",
  "ff99aa",
  "6d482f",
  "9c6926",
  "000000",
  "898d90",
  "d4d7d9",
  "ffffff",
]);

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

const darcula = new Palette("Darcula", [
  "000000",
  "2B2B2B",
  "323232",
  "214283",
  "555555",
  "E74644",
  "379C1A",
  "5394ec",
  "299999",
  "808080",
  "AE8ABE",
  "DCC457",
  "A9B7C6",
  "EEEEEE",
]);

const palettes = [
  place,
  nord,
  monokai,
  grayScale1bit,
  grayScale2bits,
  grayScale2bitsGamma,
  darcula,
];

palettes.sort((a, b) => a.label.localeCompare(b.label));

export { palettes };
export default Palette;
