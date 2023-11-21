import { Product } from '../types/Product';
import { client } from '../utils/httpClient';

export const getProducts = () => client.get<Product[]>('products.json');
