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

const palettes = [nord, monokai, grayScale1bit, grayScale2bits];

export { palettes };
export default Palette;
