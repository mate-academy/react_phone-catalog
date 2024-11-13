import { Product } from '../types/Ptoduct';
import { client } from '../utils/httpClient';

export const getProducts = () => client.get<Product[]>('/api/products.json');
