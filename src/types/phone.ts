export enum Category {
  'phones',
  'accessories',
  'tablets',
}

export interface Description {
  title: string;
  text: string[];
}

export interface Phone {
  id: string;
  category: Category.phones;
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
}
