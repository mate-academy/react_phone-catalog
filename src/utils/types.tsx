export enum IconType {
  menu = 'menu',
  favourites = 'favourites',
  cart = 'cart',
  close = 'close',
}

export enum ArrowType {
  up = 'up',
  down = 'down',
  right = 'right',
  left = 'left',
}

export enum SortType {
  newest = 'newest',
  hotPrice = 'hotPrice',
}

export enum ProductCategory {
  phones = 'phones',
  tablets = 'tablets',
  accessories = 'accessories',
  products = 'products',
}

export type Products = {
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

export type ProductDescription = {
  title: string;
  text: string[];
};

export type Product = {
  id: string;
  category: string;
  namespaceId: string;
  name: string;
  capacityAvailable: string;
  capacity: string;
  priceRegular: number;
  priceDiscount: number;
  colorsAvailable: string[];
  color: string;
  images: string[];
  description: ProductDescription[];
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  camera: string;
  zoom: string;
  cell: string[];
};
