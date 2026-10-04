import products from './products.json';
import phones from './phones.json';
import tablets from './tablets.json';
import accessories from './accessories.json';
import { Category } from './Category';

const data = {
  products,
  phones,
  tablets,
  accessories,
};

export const getProducts = async <T>(category: Category): Promise<T[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));

  return data[category] as T[];
};

export const getProductById = async <T>(id: string): Promise<T | undefined> => {
  await new Promise(resolve => setTimeout(resolve, 300));

  const allProducts = [...data.phones, ...data.tablets, ...data.accessories];

  return allProducts.find(product => product.id === id) as T | undefined;
};
