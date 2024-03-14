// eslint-disable-next-line import/no-cycle
import { client } from '../helpers/fetchProduct';
import { Product } from '../types/Product';
import { ProductInfo } from '../types/ProductInfo';

export const BASE_URL =
  'https://mate-academy.github.io/react_phone-catalog/_new';

export const getProducts = () => {
  return client.get<Product[]>('/products.json');
};

export const getPhones = async () => {
  return getProducts().then(products =>
    products.filter(product => product.category === 'phones'),
  );
};

export const getTablets = async () => {
  return getProducts().then(products =>
    products.filter(product => product.category === 'tablets'),
  );
};

export const getAccessories = async () => {
  return getProducts().then(products =>
    products.filter(product => product.category === 'accessories'),
  );
};

export const getHotPriceProducts = (phones: Product[]) => {
  return [...phones]
    .sort(
      (phone1, phone2) =>
        (1 - phone1.fullPrice / phone1.price) * 100 -
        (1 - phone2.fullPrice / phone2.price) * 100,
    )
    .slice(0, 16);
};

export const getBrandNewProducts = (phones: Product[]) => {
  return [...phones]
    .sort((phone1, phone2) => phone2.price - phone1.price)
    .slice(0, 16);
};

export const getProduct = (name: string) => {
  return client.get<ProductInfo>(`/products/${name}.json`);
};

export function getRandomProducts(phones: Product[]) {
  const copy = [...phones];
  const randomizer = [];

  while (copy.length > 0) {
    const randomIndex = Math.floor(Math.random() * copy.length);
    const randomObject = copy.splice(randomIndex, 1)[0];

    randomizer.push(randomObject);
  }

  return randomizer.slice(0, 16);
}
