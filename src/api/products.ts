import { client } from '../services/fetchData';
import { Product } from '../types/products';

export const getPhones = () => client.get<Product[]>('products.json');
