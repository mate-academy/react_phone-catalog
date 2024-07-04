import products from './api/products.json';
import phones from './api/phones.json';
import tablets from './api/tablets.json';
import accessories from './api/accessories.json';
import { Details } from './types/Details';
import { Product } from './types/Product';

function wait(delay: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, delay));
}

export async function getProduct(): Promise<Product[]> {
  await wait(500);

  return products as Product[];
}

export async function getItemList(type: string): Promise<Product[]> {
  await wait(500);

  return products.filter(item => item.category === type) as Product[];
}

export async function getDetailedPhones(): Promise<Details[]> {
  await wait(500);

  return phones as Details[];
}

export async function getDetailedTablets(): Promise<Details[]> {
  await wait(500);

  return tablets as Details[];
}

export async function getDetailedAccessories(): Promise<Details[]> {
  await wait(500);

  return accessories as Details[];
}

export function getSelectedItem(category: string, itemId: string) {
  switch (category) {
    case 'tablets':
      return getDetailedTablets().then(item => {
        const selectedItem = item.find(product => product.id === itemId);

        return selectedItem;
      });

    case 'accessories':
      return getDetailedAccessories().then(item => {
        const selectedItem = item.find(product => product.id === itemId);

        return selectedItem;
      });

    default:
      return getDetailedPhones().then(item => {
        const selectedItem = item.find(product => product.id === itemId);

        return selectedItem;
      });
  }
}
