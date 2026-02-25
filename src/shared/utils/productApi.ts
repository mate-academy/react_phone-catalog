import { ProductType } from '../types/ProductType';
import { client } from './httpRequest';

export const getProducts = () => client.get<ProductType[]>('/products.json');
