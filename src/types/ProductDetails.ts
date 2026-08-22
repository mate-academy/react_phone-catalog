import { CategoryName } from './Product';

export type DescriptionSection = {
  title: string;
  text: string[];
};

// Matches an entry from /api/phones.json, /api/tablets.json or
// /api/accessories.json — the full record used on the details page.
export type ProductDetails = {
  id: string;
  category: CategoryName;
  namespaceId: string;
  name: string;
  capacityAvailable: string[];
  capacity: string;
  priceRegular: number;
  priceDiscount: number;
  colorsAvailable: string[];
  color: string;
  images: string[];
  description: DescriptionSection[];
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  camera?: string;
  zoom?: string;
  cell?: string[];
};
