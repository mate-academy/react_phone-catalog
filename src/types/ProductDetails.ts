export type ProductCategory = 'phones' | 'tablets' | 'accessories';

export interface ProductDetails {
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

  description: {
    title: string;
    text: string[];
  }[];

  screen: string;
  resolution: string;
  processor: string;
  ram: string;
}
