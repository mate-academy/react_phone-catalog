export interface BaseItem {
  id: string;
  name: string;
  priceDiscount?: number;
  price: number;
  images: string[];
}

export interface Phone extends BaseItem {
  // додаткові властивості для Phone
}

export interface Tablet extends BaseItem {
  // додаткові властивості для Tablet
}

export interface Accessories extends BaseItem {
  // додаткові властивості для Accessories
}
