export interface ProductDescription {
  title: string;
  text: string[];
}

export type Category = 'phones' | 'tablets' | 'accessories';

export interface Accessory {
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

  description: ProductDescription[];

  screen: string;
  resolution: string;
  processor: string;
  ram: string;

  camera?: string;
  zoom?: string;

  cell: string[];
}
