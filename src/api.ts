import { ProductType } from './types/ProductType';
import { ProductTypeExtended } from './types/ProductTypeExtended';

// eslint-disable-next-line operator-linebreak
const BASE_URL = 'https://ivankovbohdan.github.io/react_phone-catalog/api/';

// This function creates a promise
// that is resolved after a given delay
function wait(delay: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

function get<T>(url: string): Promise<T> {
  // eslint-disable-next-line prefer-template
  const fullURL = BASE_URL + url + '.json';

  // we add some delay to see how the loader works
  return wait(300)
    .then(() => fetch(fullURL))
    .then(res => res.json());
}

export const getProducts = () => get<ProductType[]>('/products');
export const getPhones = () => get<ProductTypeExtended[]>('/phones');
export const getTablets = () => get<ProductTypeExtended[]>('/tablets');
export const getAccessories = () => get<ProductTypeExtended[]>('/accessories');
