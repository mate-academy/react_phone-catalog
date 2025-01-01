import { fetchData } from './fetchData';

export const getProducts = () => fetchData('/public/api/products.json');
