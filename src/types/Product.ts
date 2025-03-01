interface BaseProduct {
  id: number;
  category: string;
  name: string;
  itemId: string;
  screen: string;
  capacity: string;
  color: string;
  ram: string;
}

export interface Product extends BaseProduct {
  fullPrice: number;
  price: number;
  year: number;
  image: string;
}

export interface ProductMainInfo extends BaseProduct {
  namespaceId: string;
  capacityAvailable: string[];
  priceRegular: number;
  priceDiscount: number;
  colorsAvailable: string[];
  images?: string[];
  description: ProductDescription[];
  resolution: string;
  processor: string;
  camera: string;
  zoom: string;
  cell: string[];
}

export interface ProductDescription {
  title: string;
  text: string[];
}

export type CombinedProduct = Product & ProductMainInfo;
