export enum PathType {
  HOME = '/',
  PHONES = 'phones',
  TABLETS = 'tablets',
  ACCESSORIES = 'accessories',
  FAVOURITES = 'favorites',
  CART = './cart',
}

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
