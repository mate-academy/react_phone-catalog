import { ProductGeneral } from './ProductGeneral';

export interface DescriptionProduct {
  title: string;
  text: string[];
}

export interface Product extends ProductGeneral {
  id: string;
  namespaceId: string;
  capacityAvailable: string[];
  priceRegular: number;
  priceDiscount: number;
  colorsAvailable: string[];
  images: string[];
  description: DescriptionProduct[];
  resolution: string;
  processor: string;
  camera: string;
  zoom: string;
  cell: string[];
}

// export interface Product extends ProductGeneral{
//   id: string;
//   category: ProductCategory;
//   namespaceId: string;
//   name: string;
//   capacityAvailable: string[];
//   capacity: string;
//   priceRegular: number;
//   priceDiscount: number;
//   colorsAvailable: string[];
//   color: string;
//   images: string[];
//   description: DescriptionProduct[];
//   screen: string;
//   resolution: string;
//   processor: string;
//   ram: string;
//   camera: string;
//   zoom: string;
//   cell: string[];
// }
