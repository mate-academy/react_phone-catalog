import { ProductDeatails } from '../../type/ProductDetails';
import { client } from '../../helpers/fetch/httpClient';

export function getProductDetails(id: string) {
  return client.get<ProductDeatails>(`/products/${id}.json`);
}
