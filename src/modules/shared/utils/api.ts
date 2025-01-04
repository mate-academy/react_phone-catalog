import { fetchData } from './fetchData';

export const getProducts = () => fetchData('./api/products.json');
