export type ProductType = {
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
};

export type ProductDetails = {
  id: string; // <-- itemId
  namespaceId: string;
  capacityAvailable: string[];
  colorsAvailable: string[];
  images?: string[];
  description?: {
    title: string;
    text: string[];
  }[];
  priceRegular: number;
  priceDiscount: number;
  resolution?: string;
  processor?: string;
  camera?: string;
  zoom?: string;
  cell?: string[];
};

export type FullProduct = ProductType & ProductDetails;
