import { Product } from '../types/product';
import products from '../../public/api/products.json';

export function fetchProducts(): Product[] {
  return products as Product[];
}
