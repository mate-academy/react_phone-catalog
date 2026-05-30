import { ProductGeneral, ProductCategory } from '../types/ProductGeneral';
import { Product } from '../types/Product';
import { client } from '../utils/fetchClient';

export const getProducts = () => {
  return client.get<ProductGeneral[]>(`/products.json`);
};

export function getProductById(category: ProductCategory, productId: string) {
  return client
    .get<Product[]>(`/${category}.json`)
    .then(productsByCategory =>
      productsByCategory.find(product => product.id === productId),
    )
    .catch(() => {
      throw Error();
    });
}
