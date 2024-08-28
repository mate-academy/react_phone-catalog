import { ProductCategories } from './ProductCategories';

export type ProductDetails = {
  id: number;
  category: ProductCategories;
  namespaceId: string;
  name: string;
  capacityAvailable: string[];
  capacity: string;
  priceRegular: number;
  priceDiscount: number;
  colorAvailable: string[];
  color: string;
  images: string[];
  description: Description[];
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  camera: string;
  zoom: string;
  cell: string[];
};

type Description = {
  title: string;
  text: string[];
};
