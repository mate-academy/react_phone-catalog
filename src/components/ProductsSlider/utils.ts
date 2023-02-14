import { getSortedProducts } from '../../helpers/utils';

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

export const getProcessedProducts = (
  filterCriteria: ProductSliderFilters,
  sortBy: ProductSliderSorting,
  products: Product[],
) => {
  let filteredProducts: Product[];

  switch (filterCriteria) {
    case 'discount':
      filteredProducts = products.filter(({ discount }) => discount > 0);
      break;
    case 'no-discount':
      filteredProducts = products.filter(({ discount }) => discount === 0);
      break;
    case 'random':
      filteredProducts = getRandomProducts(products);
      break;
    default:
      filteredProducts = products;
  }

  return getSortedProducts(filteredProducts, sortBy);
};
