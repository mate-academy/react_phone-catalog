import { ProductCategory } from './ProductDetails';

export type ProductCardItem = {
  id: string;
  itemId: string;
  name: string;

  price: number;
  fullPrice: number;

  image: string;
  screen: string;
  ram: string;
  capacity: string;

  category: ProductCategory;

  color: string;
};

export interface CartItem extends ProductCardItem {
  quantity: number;
}
