type Color = string;

interface BaseJob {
  kind: string;
  image: ArrayBuffer;
  palette: Color[];
}

interface FloydSteinberg extends BaseJob {
  kind: "FLOYD_STEINBERG";
}

interface Bayer extends BaseJob {
  kind: "BAYER";
}

interface PixelMapper extends BaseJob {
  kind: "PIXEL_MAPPER";
}

export type Job = FloydSteinberg | Bayer | PixelMapper;
