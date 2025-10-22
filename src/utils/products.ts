import axios from 'axios';
import { Product } from '../types/Product';

export const fetchProducts = async (): Promise<Product[]> => {
  const res = await axios.get<Product[]>('../api/products.json');
  return res.data;
};
