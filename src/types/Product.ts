export interface ProductDescription {
  title: string;
  text: string[];
}

export interface Product extends ProductDescription {
  id: number | string;
  category: 'phones' | 'tablets' | 'accessories';
  namespaceId?: string;
  itemId?: string;

  name: string;

  capacityAvailable: string[];
  capacity?: string;

  priceRegular?: number;
  priceDiscount?: number;

  fullPrice: number;
  price: number;

  colorsAvailable: string[];
  color: string;

  images?: string[];
  image?: string;

  description: {
    title: string;
    text: string[];
  }[];

  screen?: string;
  resolution?: string;
  processor?: string;
  ram?: string;
  camera?: string;
  zoom?: string;
  cell?: string[];

  year?: number;
}
