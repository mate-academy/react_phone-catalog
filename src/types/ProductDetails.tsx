interface Description {
  title: string;
  text: string[];
}

//  інтерфейс для всіх товарів
interface BaseProduct {
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
  description: Description[];
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  cell: string[];
  year: number;
}

// для телефонів
export interface Phone extends BaseProduct {
  camera: string;
  zoom: string;
}

// для планшетів
export interface Tablet extends BaseProduct {
  camera: string;
  zoom: string;
}

//  для аксесуарів (у них немає camera та zoom)
export interface Accessory extends BaseProduct {}

// тип, що об'єднує всі товари
export type ProductDetails = Phone | Tablet | Accessory;

// інтерфейс для виводу на UI
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
  year?: number;
  image: string;
}
