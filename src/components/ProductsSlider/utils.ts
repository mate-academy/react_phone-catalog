import { getSortedProducts } from '../../helpers/utils';
import { Product } from '../../types/Product';

export enum Direction {
  PREV = 'prev',
  NEXT = 'next',
}

const generateRandomNumber = (max: number) => {
  return Math.floor(Math.random() * (max + 1));
};

const getRandomProducts = (products: Product[]) => {
  const availableIndexes = products.map((...args) => args[1]);
  const indexes: number[] = [];

  for (let i = 0; i < 8; i += 1) {
    const randomIndex = generateRandomNumber(availableIndexes.length - 1);
    const newIndex = availableIndexes.splice(randomIndex, 1)[0];

    indexes.push(newIndex);
  }

  return indexes.map((randomIndex) => products[randomIndex]);
};

export const filterProducts = (
  filter: string,
  sortBy: string,
  products: Product[],
) => {
  let filteredProducts: Product[] = [];

  switch (filter) {
    case 'discount':
      filteredProducts = products.filter(product => product.discount > 0);
      break;

    case 'no-discount':
      filteredProducts = products.filter(product => product.discount === 0);
      break;

    case 'random':
      filteredProducts = getRandomProducts(products);
      break;

    default:
      filteredProducts = products;
  }

  return getSortedProducts(filteredProducts, sortBy);
};
