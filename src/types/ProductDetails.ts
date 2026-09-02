/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ProductDescription {
  title: string;
  text: string[];
}

export interface ProductDetails {
  [x: string]: any;
  id: string;
  category: string;
  namespaceId: string;
  name: string;

  capacityAvailable: string[];
  capacity: string;

  priceRegular: number;
  priceDiscount: number;

  colorsAvailable: string[];
  color: string;

  images: string[];

  description: ProductDescription[];

  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  camera: string;
  zoom: string;

  cell: string[];
}
