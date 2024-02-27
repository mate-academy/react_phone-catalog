import { Product } from '../types/Product';

// eslint-disable-next-line max-len
const BASE_URL = 'https://mate-academy.github.io/react_phone-catalog/_new/products';

const wait = (delay = 400) => {
  return new Promise(resolve => {
    return setTimeout(resolve, delay);
  });
};

export const getProducts = () => {
  return fetch(`${BASE_URL}.json`, { method: 'GET' })
    .then(response => {
      if (!response.ok) {
        throw new Error();
      }

      return response.json();
    });
};

export const getHotPriceProducts = () => getProducts()
  .then(res => res.sort((good1: Product, good2: Product) => {
    return (good2.fullPrice - good2.price) - (good1.fullPrice - good1.price);
  }));

export const getBrandNewProducts = () => getProducts()
  .then(res => res.sort((good1: Product, good2: Product) => {
    return good2.fullPrice - good1.fullPrice;
  }));

export const getItems = (category: string) => wait()
  .then(getProducts)
  .then(res => res.filter((good: Product) => good.category === category));

export async function getProductDetails(productId: string | undefined = '') {
  const response = await wait().then(() => fetch(`${BASE_URL}/${productId}.json`, { method: 'GET' }));

  if (!response.ok) {
    throw new Error();
  }

  return response.json();
}

export const getSuggestedProducts = async () => {
  const products = await getProducts();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return products.sort((_a: Product, _b: Product) => 0.5 - Math.random());
};
