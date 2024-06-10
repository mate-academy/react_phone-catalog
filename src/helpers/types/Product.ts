import { ProductType } from './ProductType';

export interface Product {
  type: ProductType;
  price: number;
  discount: number;
  age: number;
  id: string;
  imageUrl: string;
  name: string;
}
