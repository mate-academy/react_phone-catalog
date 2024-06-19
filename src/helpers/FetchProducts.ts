import { Product } from '../types/Product';
import { PhoneDetails } from '../types/Phone';

export const URL_NEW
 = 'https://JulyaPetrovskaya.github.io/react_phone-catalog/_new/products.json';
export const detailsURL
 = 'https://JulyaPetrovskaya.github.io/react_phone-catalog/_new/products/';

export const getProducts = <T>(url: string): Promise<T> => {
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
      }

      return response.json();
    });
};

export function getPhoneDetails(phoneId: string) {
  return getProducts<PhoneDetails>(`${detailsURL}/${phoneId}.json`);
}

export const getAllProducts = async () => {
  const products: Product[] = await getProducts(URL_NEW);

  return products;
};

export const getHotProducts = async () => {
  const products: Product[] = await getProducts(URL_NEW);

  return products.sort(
    (a, b) => (b.fullPrice - b.price) - (a.fullPrice - a.price),
  );
};

export const getBrandNewProducts = async () => {
  const products: Product[] = await getProducts(URL_NEW);

  return products.sort((a, b) => {
    if (a.year !== b.year) {
      return b.year - a.year;
    }

    if (a.price !== b.price) {
      return b.price - a.price;
    }

    return 0;
  });
};

function shuffleArray<T>(array: T[]): T[] {
  return array
    .map((value: T) => ({ value, sortKey: Math.random() }))
    .sort((a, b) => a.sortKey - b.sortKey)
    .map(({ value }) => value);
}

export function getShuffleProducts() {
  return getAllProducts()
    .then(phones => shuffleArray<Product>([...phones]).slice(0, 20));
}
