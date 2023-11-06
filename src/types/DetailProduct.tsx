export type DetailProduct = {
  additionalFeatures: string;
  android: {
    [key: string]: string,
  },
  availability: string[],
  battery: {
    [key: string]: string,
  },
  camera: {
    [key: string]: string | string[],
  },
  connectivity: {
    [key: string]: string | boolean,
  },
  description: string,
  display: {
    [key: string]: string | boolean,
  },
  hardware: {
    [key: string]: string | boolean,
  },
  id: string,
  images: string[],
  name: string,
  sizeAndWeight: {
    [key: string]: string | string[],
  },
  storage: {
    [key: string]: string,
  }
};
