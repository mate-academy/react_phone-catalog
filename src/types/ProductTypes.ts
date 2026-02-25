export interface CatalogProduct {
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
