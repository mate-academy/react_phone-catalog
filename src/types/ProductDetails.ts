import { Category } from '../enums/Category';

type Specification = string;
type ImagePath = string;

export type ProductDetails = {
  id: string;
  namespaceId: string;

  name: string;
  category: Category;

  priceRegular: number;
  priceDiscount: number;

  capacityAvailable: string[];
  capacity: string;

  colorsAvailable: string[];
  color: string;

  images: ImagePath[];

  description: {
    title: string;
    text: string[];
  }[];

  screen: Specification;
  resolution: Specification;
  processor: Specification;
  ram: Specification;
  cell: Specification[];
  zoom: Specification;
  camera: Specification;
};
