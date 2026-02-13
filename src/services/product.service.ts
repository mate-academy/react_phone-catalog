import { Product } from '../types/Product';
import { getData } from '../utils/httpClient';

export const getProducts = () => getData<Product[]>('/products');
