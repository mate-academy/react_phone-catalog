export interface CatalogProducts {
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

export interface ProductDescription {
  title: string;
  text: string[];
}

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
  cell: string[];
}

export interface DeviceWithCamera extends BaseProduct {
  camera: string;
  zoom: string;
}

export type PhoneType = DeviceWithCamera;
export type TabletType = DeviceWithCamera;
export type WatchType = BaseProduct;

export type Product = PhoneType | TabletType | WatchType;
export interface Category {
  name: string;
  src: string;
  alt: string;
  link: string;
  quantity: number;
  type: CategoriesType;
}

export enum SortType {
  AGE = 'age',
  TITLE = 'title',
  PRICE = 'price',
}

export enum PerPageType {
  ALL = 'all',
  FOUR = '4',
  EIGHT = '8',
  SIXTEEN = '16',
}

export enum PathType {
  HOME = '/',
  PHONES = '/phones',
  TABLETS = '/tablets',
  ACCESSORIES = '/accessories',
  FAVOURITES = '/favorites',
  CART = '/cart',
  PRODUCT = '/product',
  PRODUCTS = '/products',
  CATEGORY = 'category',
  PRODUCT_ID = 'productId',
}

export enum CategoriesType {
  PHONES = 'phones',
  TABLETS = 'tablets',
  ACCESSORIES = 'accessories',
}
