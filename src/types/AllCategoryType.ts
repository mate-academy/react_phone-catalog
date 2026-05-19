import { CategoryType } from './CategoryType';

type CapacityType =
  | '16GB'
  | '32GB'
  | '64GB'
  | '128GB'
  | '256GB'
  | '512GB'
  | '1T';

type DescriptionType = {
  title: string;
  text: string[];
};

export type AllCategoryType = {
  id: string;
  category: CategoryType;
  namespaceId: string;
  name: string;
  capacityAvailable: CapacityType[];
  capacity: CapacityType;
  priceRegular: number;
  priceDiscount: number;
  colorsAvailable: string[];
  color: string;
  images: string[];
  description: DescriptionType[];

  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  camera: string;
  zoom: string;
  cell: string;
};
