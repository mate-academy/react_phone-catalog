export interface ProductPhone {
  id: string;
  category: string;
  phoneId: string;
  itemId: string;
  name: string;
  priceRegular: number;
  priceDiscount: number;
  screen: string;
  capacity: string;
  color: string;
  ram: string;
  year: number;
  images: string;
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
