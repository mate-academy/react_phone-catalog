// 1. Інформація про товар для списків та карток (з файлу products.json)
export interface Product {
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

// 2. Опис для детальної сторінки товару
export interface ProductDescription {
  title: string;
  text: string[];
}

// 3. Повна детальне інформація про товар (з файлів phones.json, tablets.json тощо)
export interface ProductDetails {
  id: string;
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
