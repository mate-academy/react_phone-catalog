import { Product } from '../components/types/Product';
import products from '../../public/api/products.json';

export function getNewPhones(prdcts: Product[], year = 2022) {
  return prdcts.reduce((acc, product) => {
    if (
      product.year === year &&
      !acc.some(({ color }) => color === product.color)
    ) {
      acc.unshift(product);
    }

    return acc;
  }, [] as Product[]);
}

export function getHotPrices(prdcts: Product[]) {
  return prdcts.reduce((acc, product) => {
    if (
      product.category === 'phones' &&
      product.price < product.fullPrice &&
      !acc.some(({ color }) => color === product.color)
    ) {
      acc.push(product);
    }

    return acc;
  }, [] as Product[]);
}

export function sortProducts(prdcts: Product[], sortField: string | null) {
  const prepearedProducts = [...prdcts];

  if (sortField) {
    prepearedProducts.sort((product1, product2) => {
      switch (sortField) {
        case 'title':
          return product1.name.localeCompare(product2.name);

        case 'age':
          return product2.year - product1.year;

        case 'price':
          return product1.price - product2.price;

        default:
          return 0;
      }
    });
  }

  return prepearedProducts;
}

export function getSuggestedProducts(prdcts: Product[], count = 10) {
  const randomProducts: Product[] = [];

  for (let i = 1; i <= count; i++) {
    randomProducts.push(prdcts[Math.floor(Math.random() * prdcts.length)]);
  }

  return randomProducts;
}

export interface Data {
  data: Product[] | undefined;
  isLoading: boolean;
}
export function getProductsByCategory(category: string): Promise<Data[]> {
  const promises = [];

  //TODO add more cases
  switch (category) {
    case 'phones': {
      const data = products.filter(product => {
        return product.category === 'phones';
      });

      promises.push(
        new Promise(resolve => resolve({ data, isLoading: false })),
      );
      break;
    }

    case 'tablets': {
      const data = products.filter(product => {
        return product.category === 'tablets';
      });

      promises.push(
        new Promise(resolve => resolve({ data, isLoading: false })),
      );
      break;
    }

    case 'accessories': {
      const data = products.filter(product => {
        return product.category === 'accessories';
      });

      promises.push(
        new Promise(resolve => resolve({ data, isLoading: false })),
      );
      break;
    }

    default:
      break;
  }

  promises.push(new Promise(resolve => setTimeout(resolve, 1500)));

  return Promise.all(promises) as Promise<Data[]>;
}
