export type ProductCategory = 'phones' | 'tablets' | 'accessories';

export interface ProductDescription {
  title: string;
  text: string[];
}

export interface ProductSpecs {
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  camera?: string;
  zoom?: string;
  cell: string[];
}

export interface ProductDetails extends ProductSpecs {
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
  description: ProductDescription[];
}
