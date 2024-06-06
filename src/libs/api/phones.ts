import { IProduct, ProductCategory } from '../types';
import { client } from '../utils/fetchClient';

export const getPhones = async () => {
  const allProducts = await client.get<IProduct[]>('products.json');

  return allProducts.filter(
    product => product.category === ProductCategory.Phones,
  );
};
