export interface DescriptionSection {
  title: string;
  text: string[];
}

export interface BaseProduct {
  id: number | string;
  category: string;
  name: string;
  priceRegular: number;
  priceDiscount: number;
  screen: string;
  capacity: string;
  color: string;
  ram: string;
  image: string;
  price?: number;
  fullPrice?: number;
}

export interface Product extends BaseProduct {
  id: number;
  itemId: string;
  year: number;
  image: string;
  fullPrice?: number;
  price?: number;
}

export interface ProductDetails extends BaseProduct {
  id: string;
  namespaceId: string;
  capacityAvailable: string[];
  colorsAvailable: string[];
  images: string[];
  description: DescriptionSection[];
  resolution: string;
  processor: string;
  cell: string[];
  camera?: string;
  zoom?: string;
}
