import { ProductCagetories } from './ProductCategories';

interface ProductDescricption {
  title: string;
  text: string[];
}

export interface ProductDetailsType {
  id: string;
  caregory: ProductCagetories;
  namespaceId: string;
  name: string;
  capacityAvailable: string[];
  capacity: string;
  priceRegular: number;
  priceDiscount: number;
  colorsAvailable: string[];
  color: string;
  images: string[];
  description: ProductDescricption[];
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  camera: string;
  zoom: string;
  cell: string[];
}
