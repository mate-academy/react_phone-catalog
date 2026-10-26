export enum LogoVariants {
  header = 'header',
  footer = 'footer',
}

export enum NavIconsVariant {
  header = 'header',
  burger = 'burger',
}

export enum NavItemVariants {
  navlist = 'navlist',
  navicons = 'navicons',
  burger = 'burger',
}

export enum NavListVariants {
  header = 'header',
  burger = 'burger',
}

export type Product = {
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

export type SliderData = {
  src: string;
  to: string;
};

export enum ProductSliderTitles {
  brandNew = 'Brand new models',
  hotPrices = 'Hot prices',
  alsoLike = 'You may also like',
}

export type Accessories = {
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
  description: {
    title: string;
    text: string[];
  }[];
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  cell: string[];
};

export type Phone = {
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
  description: {
    title: string;
    text: string[];
  }[];
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  camera: string;
  zoom: string;
  cell: string[];
};

export type Tablet = {
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
  description: {
    title: string;
    text: string[];
  }[];
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  camera: string;
  zoom: string;
  cell: string[];
};

export enum SortByOption {
  default = 'Default',
  price = 'Price',
  year = 'Year',
  name = 'Name',
}

export enum OnPageOption {
  all = 'All',
  eight = '8',
  sixteen = '16',
  thirtyTwo = '32',
}

export type DropdownData = {
  options: string[];
  key: string;
};

export enum ParamKeys {
  sortBy = 'SortBy',
  onPage = 'OnPage',
  page = 'page',
}

export type Category = 'phones' | 'tablets' | 'accessories';

export type ProductDetails = Phone | Tablet | Accessories;

export type CartProduct = Product & {
  quantity: number;
};
