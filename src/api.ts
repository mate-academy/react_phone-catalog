import { PhoneModel, AccessoriesModel } from './types/model';
import { Product } from './types/products';

// 1. Видаляємо останній слеш з BASE_URL, якщо він там є.
// Це гарантує, що BASE_URL буде чистим "/react_phone-catalog"
const BASE_URL = import.meta.env.BASE_URL.replace(/\/$/, '');

// 2. Тепер ми безпечно додаємо "/api/..."
const API_URL = `${BASE_URL}/api`;

function wait(delay: number) {
  return new Promise(resolve => setTimeout(resolve, delay));
}

export async function getPhones(): Promise<PhoneModel[]> {
  return wait(500)
    .then(() => fetch(`${API_URL}/phones.json`))
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to load phones: ${response.statusText}`);
      }

      return response.json();
    });
}

export async function getTablets(): Promise<PhoneModel[]> {
  return wait(500)
    .then(() => fetch(`${API_URL}/tablets.json`))
    .then(response => response.json());
}

export async function getAccessories(): Promise<AccessoriesModel[]> {
  return wait(500)
    .then(() => fetch(`${API_URL}/accessories.json`))
    .then(response => response.json());
}

export async function getProducts(): Promise<Product[]> {
  return wait(3000)
    .then(() => fetch(`${API_URL}/products.json`))
    .then(response => response.json());
}
