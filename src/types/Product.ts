export interface ProductPhone {
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
  description: { title: string; text: string[] }[];
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  camera: string;
  zoom: string;
  cell: string[];
}

export interface ProductTablet {
  id: string;
  category: string;
  namespaceId: string; // Changed from phoneId to namespaceId
  name: string;
  capacityAvailable: string[]; // Added this field
  capacity: string;
  priceRegular: number;
  priceDiscount: number;
  colorsAvailable: string[]; // Added this field
  color: string;
  images: string[]; // Changed from string to an array of strings
  description: Array<{
    title: string;
    text: string[];
  }>; // Added this field to match the description structure
  screen: string;
  resolution: string; // Added this field
  processor: string; // Added this field
  ram: string;
  camera: string; // Changed this field
  zoom: string; // Added this field
  cell: string[]; // Added this field
}

export interface ProductAccessory {
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
  description: Array<{
    title: string;
    text: string[];
  }>;
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  camera: string;
  cell: string[];
}

export type Product =  ProductPhone | ProductTablet | ProductAccessory;

export interface LimitedProduct {
  id: number,
  category: string,
  itemId: string,
  name: string,
  fullPrice: number,
  price: number,
  screen: string,
  capacity: string,
  color: string,
  ram: string,
  year: number,
  image: string
}


export interface Colors {
  [key: string]: string;
  black: string;
  gold: string;
  yellow: string;
  green: string;
  midnightgreen: string;
  silver: string;
  spacegray: string;
  red: string;
  white: string;
  purple: string;
  coral: string;
  rosegold: string;
  midnight: string;
  spaceblack: string;
  blue: string;
  pink: string;
  sierrablue: string;
  graphite: string;
  skyblue: string;
  starlight: string;
}
