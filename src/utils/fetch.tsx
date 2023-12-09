import { DetailsPhone } from '../Type/DetailsPhone';
import { ProductPhone } from '../Type/phone';

// eslint-disable-next-line max-len
const API_URL = 'https://mate-academy.github.io/react_phone-catalog/_new/products.json';

function wait(delay: number) {
  return new Promise(resolve => setTimeout(resolve, delay));
}

export async function getPhones(): Promise<ProductPhone[]> {
  // keep this delay for testing purpose
  return wait(500)
    .then(() => fetch(API_URL))
    .then(response => response.json());
}

export async function getPhone(phoneId: string): Promise<DetailsPhone> {
  // keep this delay for testing purpose
  return wait(500)
    .then(() => fetch(`https://mate-academy.github.io/react_phone-catalog/_new/products/${phoneId}.json`))
    .then(response => response.json());
}
