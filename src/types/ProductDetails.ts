export interface ProductDetails {
  id: string;
  category: string; // "phones"
  namespaceId: string; // "apple-iphone-11"
  name: string;
  capacityAvailable: string[]; // ["64GB", "128GB", "256GB"]
  capacity: string; // "64GB"
  priceRegular: number;
  priceDiscount: number;
  colorsAvailable: string[]; // ["black", "green", "red"...]
  color: string; // "black"
  images: string[];
  description: { title: string; text: string[] }[];
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  camera?: string;
  zoom?: string;
  cell: string[];
}
