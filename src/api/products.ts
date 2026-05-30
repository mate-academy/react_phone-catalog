import { client } from '../shared/utils/fetchProdacts';
import { Product } from '../shared/types/Product';

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const getProducts = () => {
  return client.get<Product[]>('/react_phone-catalog/api/products.json');
};

export const getProductByItemId = (itemId: string) => {
  return wait(300)
    .then(() => getProducts())
    .then(
      (products: Product[]) =>
        products.find((product: Product) => product.itemId === itemId) || null,
    );
};
