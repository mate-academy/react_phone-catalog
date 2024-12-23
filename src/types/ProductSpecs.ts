export type Description = {
  title: string;
  text: string[];
};

export enum Category {
  Accessories = 'accessories',
  Phones = 'phones',
  Tablets = 'tablets',
}

export type ProductSpecs = {
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
  processor: string;
  ram: string;
  camera: string;
  zoom: string;
  cell: string[];
};
