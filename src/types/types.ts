export type ProductDetails = {
  id: string;
  category: ProductCategory;
  namespaceId: string;
  name: string;
  capacityAvailable: string[];
  capacity: string;
  priceRegular: number;
  priceDiscount: number;
  colorsAvailable: string[];
  color: string;
  images: string[];
  description: {
    title: string;
    text: string[];
  }[];
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  camera?: string;
  zoom?: string;
  cell: string[];
};

export type Product = {
  id: number;
  category: ProductCategory;
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

export type ProductForCart = Product & {
  quantity: number;
};

export enum ProductCategory {
  Phones = 'phones',
  Tablets = 'tablets',
  Accessories = 'accessories',
}

export enum PageTitles {
  Phones = 'Mobile phones',
  Tablets = 'Tablets',
  Accessories = 'Accessories',
}

export enum SliderTitle {
  NewModels = 'Brand new models',
  HotPrices = 'Hot prices',
  MobilePhones = 'Mobile phones',
  YouMayAlsoLike = 'You may also like',
}

export enum SortType {
  Newest = 'Newest',
  Alphabetically = 'Alphabetically',
  Cheapest = 'Cheapest',
  Default = 'Default',
}

export enum PerPage {
  Four = 4,
  Eight = 8,
  Sixteen = 16,
}

export type SearchParams = {
  [key: string]: string | null;
};

export enum TechSpecs {
  Screen = 'Screen',
  Resolution = 'Resolution',
  Processor = 'Processor',
  RAM = 'RAM',
  Built = 'Built in memory',
  Capacity = 'Capacity',
  Camera = 'Camera',
  Zoom = 'Zoom',
  Cell = 'Cell',
}
