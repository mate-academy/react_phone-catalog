export interface ProductFromServer {
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

export interface ICartItems {
  isCartItem: boolean;
  count: number;
}

// export interface Product extends ProductFromServer {
//   favorite: boolean;
//   cartItem: ICartItems;
// }

export type ProductInfo = {
  itemId: string;
  favorite: boolean;
  cartItem: number | false;
};

export type Product = ProductFromServer & Omit<ProductInfo, 'itemId'>;

export interface ProductSchema {
  products: ProductInfo[];
  _inited: boolean;
}

export const LOCAL_STORAGE_FAVORITES = 'favorites';
export const LOCAL_STORAGE_CART_PRODUCTS = 'cart_products';
