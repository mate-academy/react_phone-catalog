export type CategoryType = 'phones' | 'tablets' | 'accessories';

export type SupportedLanguage = 'en' | 'uk';

export enum SortType {
  Age = 'age',
  Title = 'title',
  Price = 'price',
}

export enum PerPageType {
  Sixteen = '16',
  Eight = '8',
  Four = '4',
  All = 'all',
}

export interface ProductType {
  id: number;
  category: string;
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

export interface ProductTechSpecsType {
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  cell: string[];
  camera?: string; // опціонально (немає в аксесуарах)
  zoom?: string; // опціонально (немає в аксесуарах)
}

export interface ProductDescriptionSection {
  title: string;
  text: string[];
}

export interface ProductDetailsType extends ProductTechSpecsType {
  id: string;
  category: string;
  namespaceId: string;
  name: string;
  capacityAvailable: string[];
  capacity: string;
  priceRegular: number;
  priceDiscount: number;
  colorsAvailable: string[];
  color: string;
  images: string[];
  description: ProductDescriptionSection[];
}

export interface CartItemType {
  product: ProductType;
  quantity: number;
}
