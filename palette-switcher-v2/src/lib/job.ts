type Color = string;

export enum Algorithm {
  FLOYD_STEINBERG = "FLOYD_STEINBERG",
  BAYER = "BAYER",
  PIXEL_MAPPER = "PIXEL_MAPPER"
};

type AlgorithmName = {
  [T in Algorithm]: {
    [Algorithm.FLOYD_STEINBERG]: "Floyd-Steinberg",
    [Algorithm.BAYER]: "Bayer",
    [Algorithm.PIXEL_MAPPER]: "Pixel Mapper"
  }[T]
}

interface BaseJob {
  kind: Algorithm;
  image: ArrayBuffer;
  palette: Color[];
}

interface FloydSteinberg extends BaseJob {
  kind: Algorithm.FLOYD_STEINBERG;
}

interface Bayer extends BaseJob {
  kind: Algorithm.BAYER;
}

interface PixelMapper extends BaseJob {
  kind: Algorithm.PIXEL_MAPPER;
}

export type Job = FloydSteinberg | Bayer | PixelMapper;
