class Palette {
  colors: string[];
  label: string;

  constructor(label: string, colors: string[]) {
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

const greyScale1bit = new Palette("Grey Scale 1 bit (Black & White)", [
  "000000",
  "ffffff",
]);

const greyScale2bits = new Palette("Grey Scale 2 bits", [
  "000000",
  "676767",
  "b6b6b6",
  "ffffff",
]);

let greyColors: string[] = [];
for (let i = 0; i < 256; i++) {
  const hexValue = i.toString(16).padStart(2, "0");
  greyColors.push(`${hexValue}${hexValue}${hexValue}`);
}
const greyScale8bits = new Palette("Grey Scale 8 bits", greyColors);

export const palettes = [
  nord,
  monokai,
  greyScale1bit,
  greyScale2bits,
  greyScale8bits,
];
export default Palette;
