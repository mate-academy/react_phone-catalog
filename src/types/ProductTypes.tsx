interface Description {
  title: string;
  text: string[];
}

//  інтерфейс для всіх товарів
// interface BaseProduct {
//   id: string;
//   category: string;
//   namespaceId: string;
//   name: string;
//   capacityAvailable: string[];
//   capacity: string;
//   priceRegular: number;
//   priceDiscount: number;
//   colorsAvailable: string[];
//   color: string;
//   images: string[];
//   description: Description[];
//   screen: string;
//   resolution: string;
//   processor: string;
//   ram: string;
//   cell: string[];
//   year: number;
// }

// для телефонів
export interface Phone {
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
  camera: string;
  zoom: string;
  cell: string[];
}

// для планшетів
export interface Tablet {
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
  camera: string;
  zoom: string;
  cell: string[];
}

//  для аксесуарів
export interface Accessory {
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
}

// тип що об'єднує всі товари
export type ProductDetails = Phone | Tablet | Accessory;

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
