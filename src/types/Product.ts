export interface Product {
  id: string;
  phoneId: string;
  year: number;
  name: string;
  image: string;
  category: string;
  price: number;
  fullPrice: number;
  screen: string;
  capacity: string;
  ram: string;
}

export interface ProductDetails {
  name: string,
  screen: string,
  resolution: string,
  processor: string,
  ram: string,
  capacity: string,
  capacityAvailable: string[],
  camera: string,
  zoom: string,
  cell: string[],
  color: string
  namespaceId: string
  images: string[],
  description: DescriptionSection[],
  colorsAvailable: string[],
  priceRegular: number,
  priceDiscount: number,
}

export type DescriptionSection = {
  title: string,
  text: string[]
};
