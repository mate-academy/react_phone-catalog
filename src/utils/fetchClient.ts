import { Product } from '../types/Product';
import { SliderProduct } from '../types/SliderProduct';

const BASE_URL = '/api';

function wait(delay: number) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

function getData<T>(url: string): Promise<T> {
  return wait(2000)
    .then(() => fetch(BASE_URL + url))
    .then(response => {
      if (!response.ok) {
        throw new Error();
      }

      return response.json();
    });
}

export function getSliderProducts() {
  return getData<SliderProduct[]>('/products.json');
}

export function getPhones() {
  return getData<Product[]>('/phones.json');
}

export function getTablets() {
  return getData<Product[]>('/tablets.json');
}

export function getAccessories() {
  return getData<Product[]>('/accessories.json');
}
