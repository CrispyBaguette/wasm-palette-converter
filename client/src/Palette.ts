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

const gruvbox = new Palette("Gruvbox", [
  "1d2021",
  "282828",
  "32302f",
  "3c3836",
  "504945",
  "665c54",
  "7c6f64",
  "7c6f64",
  "928374",
  "928374",
  "f9f5d7",
  "fbf1c7",
  "f2e5bc",
  "ebdbb2",
  "d5c4a1",
  "bdae93",
  "a89984",
  "a89984",
  "fb4934",
  "b8bb26",
  "fabd2f",
  "83a598",
  "d3869b",
  "8ec07c",
  "fe8019",
  "cc241d",
  "98971a",
  "d79921",
  "458588",
  "b16286",
  "689d6a",
  "d65d0e",
  "9d0006",
  "79740e",
  "b57614",
  "076678",
  "8f3f71",
  "427b58",
  "af3a03",
]);

const palettes = [
  nord,
  monokai,
  grayScale1bit,
  grayScale2bits,
  grayScale2bitsGamma,
  dracula,
  gruvbox,
];

palettes.sort((a, b) => a.label.localeCompare(b.label));

export { palettes };
export default Palette;
