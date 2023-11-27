import { Product } from '../types/Product';
import { ProductDetails } from '../types/ProductDetails';

const URL
  = 'https://mate-academy.github.io/react_phone-catalog/_new';

function wait(delay: number) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

export const getPhones = (): Promise<Product[]> => {
  return wait(300)
    .then(() => fetch(`${URL}/products.json`))
    .then(response => response.json());
};

export const getPhoneDetails = (prodId: string): Promise<ProductDetails> => {
  return wait(300)
    .then(() => fetch(`${URL}/products/${prodId}.json`))
    .then(response => response.json());
};
