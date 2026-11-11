// Base for product card (products.json)
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

// Shared description block
interface Description {
  title: string;
  text: string[];
}

// Base for all detail pages (phones, tablets, accessories)
export interface ProductDetails {
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

// phones.json + tablets.json have camera & zoom
export interface ProductDetailsWithCamera extends ProductDetails {
  camera: string;
  zoom: string;
}

// accessories.json — no camera/zoom, uses base as-is
export type Accessory = ProductDetails;

// phones.json
export type Phone = ProductDetailsWithCamera;

// tablets.json
export type Tablet = ProductDetailsWithCamera;

export interface NormalizedProduct {
  id: string;
  name: string;
  image: string;
  price: number;
  fullPrice: number;
  screen: string;
  capacity: string;
  ram: string;
  category: string;
}

// services

export type ProductService<T> = {
  getAll: (limit?: number) => Promise<T[]>;
  getById: (id: string) => Promise<T | null>;
};
