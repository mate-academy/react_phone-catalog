import { Product } from '../../type/Product';
import { client } from '../../helpers/fetch/httpClient';
import {
  filterProductsByType,
} from '../../helpers/functions/sortHelperFunctions';

const url = '/products.json';

export async function getAccessories() {
  const data = await client.get<Product[]>(url);

  return filterProductsByType(data, 'accessory');
}
