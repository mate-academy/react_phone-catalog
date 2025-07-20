export interface ProductDescription {
  title: string;
  text: string[];
}

export interface DetailedProduct {
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

export type DetailedProductsApiResponse = DetailedProduct[];

export type CapacityOptions = string[];
export type ColorOptions = string[];
