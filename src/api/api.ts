import { Model } from '../types/model';
import { Product } from '../types/product';

const BASE_URL = './api/';

function get<T>(url: string): Promise<T> {
  const fullURL = BASE_URL + url + '.json';

  return fetch(fullURL).then(res => res.json());
}

export const getProducts = () => get<Product[]>('products');

export const getBrandNewModels = (): Promise<Product[]> => {
  return getProducts().then(products => {
    const seenNames = new Set<string>();

    const brandNewProducts = products
      .sort((product1, product2) => product2.year - product1.year)
      .filter(product => {
        if (seenNames.has(product.image)) {
          return false;
        }

        seenNames.add(product.image);

        return true;
      })
      .slice(0, 20);

    return brandNewProducts;
  });
};

export const getHotPrices = (): Promise<Product[]> => {
  return getProducts().then(products =>
    products
      .sort(
        (product1, product2) =>
          product2.fullPrice -
          product2.price -
          (product1.fullPrice - product1.price),
      )
      .slice(0, 20),
  );
};

export const getPhones = () => get<Model[]>('phones');

export const getTablets = () => get<Model[]>('tablets');

export const getAccessories = () => get<Model[]>('accessories');

export const getSelectedProduct = async ({
  category,
  id,
  namespaceId,
  color,
  capacity,
  currentCapacity,
  currentColor,
}: {
  category: string;
  id?: string;
  namespaceId?: string;
  color?: string;
  capacity?: string;
  currentCapacity?: string;
  currentColor?: string;
}): Promise<Model | null> => {
  let product: Model | undefined;

  if (category === 'phones') {
    const phones: Model[] = [];

    (await getPhones()).forEach(item =>
      item.namespaceId === namespaceId ? phones.push(item) : null,
    );

    if (color && currentCapacity) {
      product = phones.find(
        item => color === item.color && currentCapacity === item.capacity,
      );
    } else if (capacity && currentColor) {
      product = phones.find(
        item => capacity === item.capacity && currentColor === item.color,
      );
    } else {
      product = (await getPhones()).find(pr => id === pr.id);
    }
  } else if (category === 'tablets') {
    const tablets: Model[] = [];

    (await getTablets()).forEach(item =>
      item.namespaceId === namespaceId ? tablets.push(item) : null,
    );

    if (color && currentCapacity) {
      product = tablets.find(
        item => color === item.color && currentCapacity === item.capacity,
      );
    } else if (capacity && currentColor) {
      product = tablets.find(
        item => capacity === item.capacity && currentColor === item.color,
      );
    } else {
      product = (await getTablets()).find(pr => id === pr.id);
    }
  } else {
    const accessories: Model[] = [];

    (await getAccessories()).forEach(item =>
      item.namespaceId === namespaceId ? accessories.push(item) : null,
    );

    if (color && currentCapacity) {
      product = accessories.find(
        item => color === item.color && currentCapacity === item.capacity,
      );
    } else if (capacity && currentColor) {
      product = accessories.find(
        item => capacity === item.capacity && currentColor === item.color,
      );
    } else {
      product = (await getAccessories()).find(pr => id === pr.id);
    }
  }

  return product || null;
};
