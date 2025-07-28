import { Products } from '../../types/Products';
import { getData } from './httpClient';

export const getAllProducts = () => getData<Products[]>('/products.json');

export const getProductsByCategory = async (category: string) => {
  const products = await getAllProducts();

  return products.filter(product => product.category === category);
};
