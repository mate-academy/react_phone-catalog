export type Description = {
  title: string;
  text: string[];
};

export type ProductDetail = {
  id: string;
  category: string;
  namespaceId: string;
  name: string;
  capacityAvailable: string[];
  capacity: string;
  priceRegular: number;
  priceDiscount?: number;
  colorsAvailable: string[];
  color: string;
  images: string[];
  description: Description[];
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  camera?: string;
  zoom?: string;
  cell: string[];
};

export type Product = {
  id: number | string;
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

export type CarouselProduct = {
  id: string;
  img: string;
  name: string;
  capacity: string;
  priceRegular: number;
  priceDiscount?: number;
  ram: string;
  screen: string;
  category: string;
};
