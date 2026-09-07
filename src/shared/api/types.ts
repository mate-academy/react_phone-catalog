export type Category = 'phones' | 'tablets' | 'accessories';

export type ProductListItem = {
  id: number;
  category: Category;
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
};

export type ProductDescription = {
  title: string;
  text: string[];
};

export type ProductDetailBase = {
  id: string;
  namespaceId: string;
  category: Category;
  name: string;
  priceRegular: number;
  priceDiscount: number;
  colorsAvailable: string[];
  color: string;
  capacityAvailable: string[];
  capacity: string;
  images: string[];
  description: ProductDescription[];
  screen?: string;
  resolution?: string;
  processor?: string;
  ram?: string;
  camera?: string;
  zoom?: string;
  cell?: string[];
  year?: number;
};

export type CartItem = {
  productId: string;
  quantity: number;
};
