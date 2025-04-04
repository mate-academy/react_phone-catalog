export interface BaseItem {
  id: string;
  name: string;
  priceDiscount?: number;
  price: number;
  images: string[];
}

export interface Phone extends BaseItem {
  id: string;
  name: string;
  priceDiscount?: number;
  price: number;
  images: string[];
}

export interface Tablet extends BaseItem {
  id: string;
  name: string;
  priceDiscount?: number;
  price: number;
  images: string[];
}

export interface Accessories extends BaseItem {
  id: string;
  name: string;
  priceDiscount?: number;
  price: number;
  images: string[];
}
