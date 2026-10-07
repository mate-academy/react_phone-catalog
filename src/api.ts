import { PhoneModel, AccessoriesModel, TabletModel } from './types/model';
import { Product } from './types/products';

const BASE_URL = import.meta.env.BASE_URL.replace(/\/$/, '');

const API_URL = `${BASE_URL}/api`;
const API_DELAY = 700;

function wait(delay: number) {
  return new Promise(resolve => setTimeout(resolve, delay));
}

let productsCache: Promise<Product[]> | null = null;
let phonesCache: Promise<PhoneModel[]> | null = null;
let tabletsCache: Promise<TabletModel[]> | null = null;
let accessoriesCache: Promise<AccessoriesModel[]> | null = null;

export async function getPhones(): Promise<PhoneModel[]> {
  if (!phonesCache) {
    phonesCache = wait(API_DELAY)
      .then(() => fetch(`${API_URL}/phones.json`))
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to load phones: ${response.statusText}`);
        }

        return response.json();
      })
      .catch(error => {
        phonesCache = null;
        throw error;
      });
  }

  return phonesCache;
}

export async function getTablets(): Promise<TabletModel[]> {
  if (!tabletsCache) {
    tabletsCache = wait(API_DELAY)
      .then(() => fetch(`${API_URL}/tablets.json`))
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to load tablets: ${response.statusText}`);
        }

        return response.json();
      })
      .catch(error => {
        tabletsCache = null;
        throw error;
      });
  }

  return tabletsCache;
}

export async function getAccessories(): Promise<AccessoriesModel[]> {
  if (!accessoriesCache) {
    accessoriesCache = wait(API_DELAY)
      .then(() => fetch(`${API_URL}/accessories.json`))
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to load accessories: ${response.statusText}`);
        }

        return response.json();
      })
      .catch(error => {
        accessoriesCache = null;
        throw error;
      });
  }

  return accessoriesCache;
}

export async function getProducts(): Promise<Product[]> {
  if (!productsCache) {
    productsCache = wait(API_DELAY)
      .then(() => fetch(`${API_URL}/products.json`))
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to load products: ${response.statusText}`);
        }

        return response.json();
      })
      .catch(error => {
        productsCache = null;
        throw error;
      });
  }

  return productsCache;
}
