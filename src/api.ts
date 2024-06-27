import { Phone } from './types/Phone';
import { Product } from './types/Product';

// eslint-disable-next-line operator-linebreak
const API_URL = '/api';

function wait(delay: number) {
  return new Promise(resolve => setTimeout(resolve, delay));
}

export async function getPhones(): Promise<Phone[]> {
  // keep this delay for testing purpose
  return wait(500)
    .then(() => fetch(`${API_URL}/phones.json`))
    .then(response => response.json());
}

export async function getTablets(): Promise<Phone[]> {
  // keep this delay for testing purpose
  return wait(500)
    .then(() => fetch(`${API_URL}/tablets.json`))
    .then(response => response.json());
}

export async function getAccessories(): Promise<Phone[]> {
  // keep this delay for testing purpose
  return wait(500)
    .then(() => fetch(`${API_URL}/accessories.json`))
    .then(response => response.json());
}

export async function getProducts(): Promise<Product[]> {
  // keep this delay for testing purpose
  return wait(500)
    .then(() => fetch(`${API_URL}/products.json`))
    .then(response => response.json());
}

export async function getPhone(phone: string): Promise<Phone | undefined> {
  // keep this delay for testing purpose
  const res = await getPhones();

  return res.find(item => item.id === phone);
}

// eslint-disable-next-line @typescript-eslint/adjacent-overload-signatures
export async function getTablet(tablet: string): Promise<Phone | undefined> {
  // keep this delay for testing purpose
  const res = await getTablets();

  return res.find(item => item.id === tablet);
}

// eslint-disable-next-line max-len
export async function getAccessorie(
  accessorie: string,
): Promise<Phone | undefined> {
  // keep this delay for testing purpose
  const res = await getAccessories();

  return res.find(item => item.id === accessorie);
}
