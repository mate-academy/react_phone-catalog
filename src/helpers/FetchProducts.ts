import { Product } from '../types/Product';
import { PhoneDetails } from '../types/Phone';

export const URL_NEW
 = 'https://mate-academy.github.io/react_phone-catalog/_new/products.json';
export const detailsURL
 = 'https://mate-academy.github.io/react_phone-catalog/_new/products/';

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
