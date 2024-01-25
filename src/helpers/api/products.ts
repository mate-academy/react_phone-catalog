import { Product } from '../types/Product';
import { TypeProduct } from '../types/TypeProduct';
import { client } from '../utils/fetchClients';

export const getProducts = () => {
  return client.get<Product[]>('/products.json');
};

export const getPhones = async () => {
  const products = await getProducts();

  return products.filter((product) => product.type === TypeProduct.phone);
};
