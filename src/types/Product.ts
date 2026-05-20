export interface Product {
  id: string;
  category: string;
  phoneId?: string;
  itemId?: string;
  name: string;
  fullPrice: number;
  price: number;
  priceRegular?: number;
  priceDiscount?: number;
  screen: string;
  capacity: string;
  color: string;
  ram: string;
  year: number;
  image: string;
  imageUrl?: string;
  images?: string[];
}

export interface ProductDescription {
  title: string;
  text: string[];
}

export interface ProductDetails extends Product {
  namespaceId: string;
  capacityAvailable: string[];
  colorsAvailable: string[];
  description: ProductDescription[];
  resolution: string;
  processor: string;
  zoom?: string;
  cell: string[];
  camera?: string;
  images: string[];
}
