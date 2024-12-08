import {
  ProductCapacity,
  ProductCategory,
  ProductCell,
  ProductColor,
  ProductDescription,
} from './Product.interfaces';

export interface ProductCoverModel {
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

export interface ProductModel {
  id: string;
  category: ProductCategory;
  namespaceId: string;
  name: string;
  capacityAvailable: ProductCapacity[];
  capacity: ProductCapacity;
  priceRegular: number;
  priceDiscount: number;
  colorsAvailable: ProductColor[];
  color: ProductColor;
  images: string[];
  description: ProductDescription[];
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  camera: string;
  zoom: string;
  cell: ProductCell[];
}

export interface StoredProductModel extends ProductModel {
  quantity: number;
}
