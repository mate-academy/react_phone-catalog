import { Product } from './Producst';

export interface CartProduct extends Product {
  quantity: number;
}
