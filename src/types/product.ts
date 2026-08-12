export type ProductCategory = 'phones' | 'tablets' | 'accessories';

export interface ProductFromServer {
  id: number;
  category: ProductCategory;
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

export interface ProductDescriptionFromServer {
  title: string;
  text: string[];
}

export interface ProductDetailsFromServer {
  id: string;
  category: ProductCategory;
  namespaceId: string;
  name: string;

  capacityAvailable: string[];
  capacity: string;

  priceRegular: number;
  priceDiscount: number;

  colorsAvailable: string[];
  color: string;

  images: string[];

  description: ProductDescriptionFromServer[];

  screen: string;
  resolution: string;
  processor: string;
  ram: string;

  camera?: string;
  zoom?: string;

  cell: string[];
}
