import { Product } from '../types/Product';
import { getData } from '../utils/httpClient';

export function getProduct(category: string, productID: string | undefined) {
  return getData<Product[]>(`/${category}.json`).then(products => {
    return products.find(product => product.id === productID);
  });
}
