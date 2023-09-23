import { getProductsWithoutDeley } from '../api/fetchClient';
import { Product } from '../types/Product';

export function getUpSalesProducts(price:number): Promise<Product[]> {
  return getProductsWithoutDeley()
    .then(productFromServer => productFromServer.filter(p => p.price <= price));
}
