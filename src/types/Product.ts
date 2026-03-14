interface BaseProduct {
  id: string;
  category: string;
  name: string;
  capacity: string;
  color: string;
  ram: string;
  screen: string;
}

export interface Products extends BaseProduct {
  itemId: string;
  fullPrice: number;
  price: number;
  year: number;
  image: string;
}

export interface Product extends BaseProduct {
  namespaceId: string;
  capacityAvailable: string[];
  priceRegular: number;
  priceDiscount: number;
  colorsAvailable: string[];
  images: string[];
  description: ProductDescription[];
  resolution: string;
  processor: string;
  camera: string;
  zoom: string;
  cell: string[];
}

export interface CartProduct {
  id: string;
  quantity: number;
  product: Products;
}

export type FavoritesProduct = Omit<CartProduct, 'quantity'>;

export interface ProductDescription {
  title: string;
  text: string[];
}
