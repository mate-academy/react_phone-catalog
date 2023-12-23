import { Accessory } from '../../Types/Accessory';
import { Phone } from '../../Types/Phone';
import { Tablet } from '../../Types/Tablet';

// eslint-disable-next-line
const BASE_URL = 'https://mate-academy.github.io/react_phone-catalog/_new/products.json';

function wait(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function getData<T>(url: string): Promise<T> {
  return wait(500)
    .then(() => fetch(BASE_URL + url))
    .then(response => {
      if (!response.ok) {
        throw new Error();
      }

      return response.json();
    });
}

function getProducts() {
  return getData<Products[]>('');
}

export const client = {
  fetchProducts: () => getProducts(),
};

export type Products = Phone | Tablet | Accessory;

export function getAllProducts(products: Products[], type: string) {
  const preparedProducts = [...products];

  preparedProducts.filter(prod => prod.category === type);

  return preparedProducts;
}

export function getHotPriceProducts(
  prodWithDiscount: Products[], type: string,
) {
  const preparedProducts = [...prodWithDiscount];

  preparedProducts.filter(prod => prod.category === type);

  preparedProducts.sort((a, b) => {
    return (b.fullPrice - b.price) - (a.fullPrice - a.price);
  });

  return preparedProducts;
}

export function getNewProducts(products: Products[], type: string) {
  const preparedProducts = [...products];

  preparedProducts.filter(prod => prod.category === type);

  preparedProducts.sort((a, b) => {
    return b.year - a.year;
  });

  return preparedProducts;
}
