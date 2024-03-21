import { Product } from '../types/Product';

const filterAndSortProducts = (
  productsToFilter: Product[],
  filterCriteria: (product: Product) => boolean,
  sortCriteria: (a: Product, b: Product) => number,
) => {
  const filteredProducts = productsToFilter.slice();
  const seen = new Set();

  return filteredProducts
    .filter(product => {
      const idPart = product.phoneId.split('-').slice(0, -1).join('-');

      if (!seen.has(idPart) && filterCriteria(product)) {
        seen.add(idPart);

        return true;
      }

      return false;
    })
    .sort(sortCriteria);
};

const hotPriceFilterCriteria = (product: Product) => !!product.fullPrice;
const newModelsFilterCriteria = (product: Product) => !product.fullPrice;

const newModelsSortCriteria = (a: Product, b: Product) => b.price - a.price;
const hotPriceSortCriteria = (a: Product, b: Product) => {
  if (a.fullPrice && b.fullPrice) {
    return b.fullPrice - b.price - (a.fullPrice - a.price);
  }

  return 0;
};

export const getHotPriceProducts = (productsToFilter: Product[]) => {
  return filterAndSortProducts(
    productsToFilter,
    hotPriceFilterCriteria,
    hotPriceSortCriteria,
  );
};

export const getBrandNewProducts = (productsToFilter: Product[]) => {
  return filterAndSortProducts(
    productsToFilter,
    newModelsFilterCriteria,
    newModelsSortCriteria,
  );
};

export const getShuffledProducts = (productsToShuffle: Product[]) => {
  return [...productsToShuffle].sort(() => Math.random() - 0.5).slice(0, 10);
};
