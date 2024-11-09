export type ProductDescription = {
  title: string;
  text?: string[];
};

export type Product = {
  id: string;
  camera: string;
  capacity: string;
  capacityAvailable: string[];
  category: string;
  cell: string[];
  color: string;
  colorsAvailable: string[];
  description: ProductDescription[];
  images: string[];
  name: string;
  namespaceId: string;
  priceDiscount: number;
  priceRegular: number;
  processor: string;
  ram: string;
  resolution: string;
  screen: string;
  zoom: string;
};
