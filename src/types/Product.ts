import { ProductCategory } from './ProductCategory';

export type Product = {
  id: number;
  category: ProductCategory;
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
};

export type CartProduct = Product & {
  count: number;
};

// export type CartItem = {
//   id: string;
//   quantity: number;
//   snapshot: ProductSnapshot;
// };

// export type FavoriteItem = {
//   id: string;
//   snapshot: ProductSnapshot;
// };
