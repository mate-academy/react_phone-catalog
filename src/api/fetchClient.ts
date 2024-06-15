import { Accessory } from '../types/Accessory';
import { Phone } from '../types/Phone';
import { Product } from '../types/Product';

export const scrollToTop = () => {
  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
};

export const getSuggestedProducts = (
  availableProducts: Product[],
  amount: number,
) => {
  const suggestedProducts = [];

  for (let i = 1; i <= amount; i++) {
    const index = Math.round(Math.random() * availableProducts.length);

    suggestedProducts.push(availableProducts[index]);
  }

  return suggestedProducts;
};

const BASE_URL = 'https://vinogradova8.github.io/react_phone-catalog/api';

function wait(delay: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

export function get<T>(url: string): Promise<T> {
  const fullURL = BASE_URL + url + '.json';

  return wait(1000)
    .then(() => fetch(fullURL))
    .then(response => response.json());
}

export const getProducts = () => get<Product[]>('/products');
export const getPhones = () => get<Phone[]>('/phones');
export const getTablets = () => get<Phone[]>('/tablets');
export const getAccessories = () => get<Accessory[]>('/accessories');
