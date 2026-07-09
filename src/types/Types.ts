export enum PathType {
  HOME = '/',
  PHONES = 'phones',
  TABLETS = 'tablets',
  ACCESSORIES = 'accessories',
  PRODUCTS = 'products',
  PRODUCT = 'product',
  FAVOURITES = 'favorites',
  CART = 'cart',
}

export enum SortType {
  AGE = 'age',
  TITLE = 'title',
  PRICE = 'price',
}

export enum PerPageType {
  FOUR = '4',
  EIGHT = '8',
  SIXTEEN = '16',
}

export type SortOption = {
  name: string;
  value: SortType;
};

export type PerPageOption = {
  name: string;
  value: PerPageType | null;
};

// HOME = '/',
//   PHONES = '/phones',
//   TABLETS = '/tablets',
//   ACCESSORIES = '/accessories',
//   FAVOURITES = '/favorites',
//   CART = '/cart',
//   PRODUCT = '/product',
//   PRODUCTS = '/products',
//   CATEGORY = 'category',
//   PRODUCT_ID = 'productId',

export interface Products {
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
}

export enum CategoryTypes {
  PHONES = 'phones',
  TABLETS = 'tablets',
  ACCESSORIES = 'accessories',
}

export type ProductDescription = {
  title: string;
  text: string[];
};
export interface BaseProduct {
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
  description: ProductDescription[];
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  cell: string;
}

export interface WithCamera extends BaseProduct {
  camera: string;
  zoom: string;
}

type PhoneType = WithCamera;
type TabletType = WithCamera;
type AccessoriesType = BaseProduct;

export type Product = PhoneType | TabletType | AccessoriesType;

export type CartItemType = {
  id: number;
  quantity: number;
  product: Products;
};
