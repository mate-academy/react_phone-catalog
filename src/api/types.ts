export interface ProductDescription {
  title: string;
  text: string[];
}

export interface Product {
  id: string;
  category: string;
  namespaceId?: string;
  name: string;
  capacity?: string;
  color?: string;
  priceRegular?: number;
  priceDiscount?: number;
  price?: number;
  fullPrice?: number;
  screen?: string;
  resolution?: string;
  processor?: string;
  ram?: string;
  camera?: string;
  zoom?: string;
  cell?: string[];
  description?: ProductDescription[];
  images: string[];
  colorsAvailable?: string[];
  capacityAvailable?: string[];
  year?: number;
}

export interface CartItem {
  id: string;
  quantity: number;
  product: Product;
}
