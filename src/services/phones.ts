import { Phone } from '../modules/shared/types/products';
import { getData } from '../utils/httpClient';

export function getPhones() {
  return getData<Phone[]>('/phones.json').then(productsFromServer =>
    productsFromServer.slice(0, 10),
  );
}
