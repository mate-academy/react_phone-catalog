export interface Product {
  id: string | number;
  category: string;
  name: string;
  fullPrice: number;
  price: number;
  screen: string;
  capacity: string;
  color: string;
  ram: string;
  year: number;
  image: string;
  itemId: string;
  phoneId?: string;
  processor?: string;
  resolution?: string;
  camera?: string;
  zoom?: string;
  cell?: string[];
}

export interface Props {
  product: Product;
}

export interface ProductDescription {
  title: string;
  text: string[];
}

export interface ProductDetails {
  id: string;
  namespaceId: string;
  name: string;
  year: number;
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

export type Category = 'phones' | 'tablets' | 'accessories';
