import { Category } from '@/const';

type Description = {
  title: string;
  text: string[];
};

export type Good = {
  id: string;
  category: Category;
  namespaceId: string;
  name: string;
  capacityAvailable: string[];
  capacity: string;
  priceRegular: number;
  priceDiscount: number;
  colorsAvailable: string[];
  color: string;
  images: string[];
  description: Description[];
  screen: string;
  resolution: string;
  ram: string;
  cell: string[];
};
