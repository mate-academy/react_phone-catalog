export type Images = {
  [key: string]: string[];
};

type Image = {
  [key: string]: string;
};

export type PriceMap = {
  [key: string]: number;
};

export type Hex = {
  [key: string]: string;
};

interface DescriptionObject {
  title: string;
  text: string[];
}

interface DescriptionArray extends Array<DescriptionObject> {}

export interface Product {
  id: string;
  category: string;
  productId: string;
  name: string;
  screen: string;
  capacity: string;
  ram: string;
  price: number;
  priceMap: PriceMap;
  image: Image;
  images: Images;
  color: string;
  colorsAvailable: string[];
  capacityAvailable: string[];
  quantity: number;
  resolution: string;
  processor: string;
  camera: string;
  zoom: string;
  cell: string[];
  hex: Hex;
  description: DescriptionArray;
}
