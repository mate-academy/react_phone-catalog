export interface Product {
  id: number;
  category: 'phones' | 'tablets' | 'accessories';
  itemId: string;
  name: string;
  fullPrice: number;
  price: number;
  image: string;
  screen: string;
  capacity: string;
  color: string;
  ram: string;
  year: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ProductDetails {
  id: string;
  category: 'phones' | 'tablets' | 'accessories';
  namespaceId: string;

  name: string;

  priceRegular: number;
  priceDiscount: number;

  capacityAvailable: string[];
  capacity: string;

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
  camera?: string;
  zoom?: string;
  cell: string[];
}
