// Product — used in products.json (catalog lists, cards)
export interface Product {
  id: number;
  category: 'phones' | 'tablets' | 'accessories';
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

// Description block inside product details
export interface ProductDescription {
  title: string;
  text: string[];
}

// ProductDetails — used in phones.json / tablets.json / accessories.json (detail page)
export interface ProductDetails {
  id: string;
  category: 'phones' | 'tablets' | 'accessories';
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
  camera: string;
  zoom: string;
  cell: string[];
}
