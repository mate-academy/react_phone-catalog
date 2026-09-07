export interface Product {
  id: number; // General numeric ID from the main products list
  category: string;
  itemId: string; // The unique slug for the product variant
  name: string;
  fullPrice: number;
  price: number;
  screen: string;
  capacity: string;
  ram: string;
  image: string;
  color: string;
  year: number;
}

export interface ProductDescription {
  title: string;
  text: string[];
}

/**
 * Represents the full details of a specific product variant.
 * This is the detailed data, typically from `phones.json`, etc.
 */
export interface ProductDetails {
  id: string; // This is the same as 'itemId'
  namespaceId: string;
  name: string;
  capacityAvailable: string[];
  capacity: string;
  priceRegular: number; // Corresponds to 'fullPrice'
  priceDiscount: number; // Corresponds to 'price'
  colorsAvailable: string[];
  color: string;
  images: string[];
  description: { title: string; text: string[] }[];
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  camera: string;
  zoom: string;
  cell: string[];
  category: string;
  year: number;
}
