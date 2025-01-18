import { client } from '../fetchClient';
import { Product } from '../../features/types/Product';
import { DetailProduct } from '../../features/types/DetailProduct';

export const getAllProducts = () => {
  return client.get<Product[]>('/products.json');
};

const phonesPromise = client.get<DetailProduct[]>('/phones.json');
const tabletsPromise = client.get<DetailProduct[]>('/tablets.json');
const accessoriesPromise = client.get<DetailProduct[]>('/accessories.json');

export const getAllDetailedProducts = async () => {
  const [phones, tablets, accessories] = await Promise.all([
    phonesPromise,
    tabletsPromise,
    accessoriesPromise,
  ]);
  const allProducts = [...phones, ...tablets, ...accessories];

  return allProducts;
};
