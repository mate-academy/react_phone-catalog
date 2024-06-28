import { Product } from 'src/types/Product';
import { Details } from 'src/types/Details';
import products from 'src/api/products.json';
import phones from 'src/api/phones.json';
import tablets from 'src/api/tablets.json';
import accessories from 'src/api/accessories.json';
import { PageType } from 'src/types/PageType';

function wait(delay: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, delay));
}

export async function getProducts(): Promise<Product[]> {
  await wait(500);

  return products as Product[];
}

export async function getDetailedTablets(): Promise<Details[]> {
  await wait(500);

  return tablets as Details[];
}

export async function getDetailedAccessories(): Promise<Details[]> {
  await wait(500);

  return accessories as Details[];
}

export async function getDetailedPhones(): Promise<Details[]> {
  await wait(500);

  return phones as Details[];
}

export function getSelectedItem(category: string, itemId: string) {
  switch (category) {
    case PageType.Tablets:
      return getDetailedTablets().then(item => {
        const selectedItem = item.find(product => product.id === itemId);

        return selectedItem;
      });

    case PageType.Accessories:
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

export function getItemByParameters(
  category: string,
  name: string,
  color: string,
  capacity: string
) {
  switch (category) {
    case 'Tablets':
      return getDetailedTablets().then(items =>
        items.find(
          product =>
            product.namespaceId === name &&
            product.color === color &&
            product.capacity === capacity
        )
      );
    case 'Accessories':
      return getDetailedAccessories().then(items =>
        items.find(
          product =>
            product.namespaceId === name &&
            product.color === color &&
            product.capacity === capacity
        )
      );
    default:
      return getDetailedPhones().then(items =>
        items.find(
          product =>
            product.namespaceId === name &&
            product.color === color &&
            product.capacity === capacity
        )
      );
  }
}
