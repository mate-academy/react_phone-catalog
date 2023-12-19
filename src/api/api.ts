import { TechProduct } from '../types/TechProduct';
import { SelectedTechProduct } from '../types/SelectedTechProduct';

// eslint-disable-next-line max-len
const BASE_URL = 'https://mate-academy.github.io/react_phone-catalog/_new';

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

  return wait(100)
    .then(() => fetch(fullURL))
    .then(res => res.json());
}

export const getTechProducts = () => get<TechProduct[]>('/products');
export const getTechProductByItemId = (id: string) => get<SelectedTechProduct>(`/products/${id}`);
