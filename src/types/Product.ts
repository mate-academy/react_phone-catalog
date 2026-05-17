export interface Product {
  specs: { name: string; value: string }[];
  img: string;
  id: number;
  category: string;
  itemId: string;
  name: string;
  fullPrice: number;
  price: number;
  screen: string;
  capacity: string;
  color: string;
  ram: string;
  year: number;
  image: string;
}

export interface DescriptionBlock {
  title: string;
  text: string[];
}

export interface ProductDetails {
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
  description: DescriptionBlock[];
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  camera: string;
  zoom: string;
  cell: string[];
}

export interface ProdSpec {
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  capacity: string;
  camera?: string;
  zoom?: string;
  cell: string[];
}

export type ProdCard = {
  id: string;
  name: string;
  year?: number;
  price: number;
  fullPrice: number;
  img: string;
  specs: {
    name: string;
    value: string;
  }[];
};

export type ProductCategory = 'phones' | 'tablets' | 'accessories';

export interface ProductContextType {
  products: Product[];
  loading: boolean;
  loadProducts: () => void;
  isDataReady: boolean;
}
