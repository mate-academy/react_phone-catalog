export interface BaseItem {
  id: string;
  name: string;
  priceDiscount?: number;
  price: number;
  images: string[];
}

export interface Phone extends BaseItem {}

export interface Tablet extends BaseItem {}

export interface Accessories extends BaseItem {}
