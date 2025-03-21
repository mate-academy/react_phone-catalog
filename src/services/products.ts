import { SortByKeys } from '../constants';
import { Categories } from '../types/Categories';
import { Product } from '../types/Product';

export const getFilteredData = (
  data: Product[],
  category: string,
  sortBy: SortByKeys,
) => {
  const filtered = data.filter(e => e.category === category);

  filtered.sort((a, b) => {
    const vOne = a as Product;
    const vTwo = b as Product;

    switch (sortBy) {
      case 'name':
        return vOne.name.localeCompare(vTwo.name);
      case 'nameDesc':
        return vTwo.name.localeCompare(vOne.name);
      case 'newest':
        return vTwo.year - vOne.year;
      case 'price':
        return vOne.price - vTwo.price;
      case 'priceDesc':
        return vTwo.price - vOne.price;
    }
  });

  return filtered;
};

export const getHotPrice = (products: Product[]) => {
  return products
    .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price))
    .slice(0, 20);
};

export const getBrandNew = (products: Product[]) => {
  return products.sort((a, b) => b.year - a.year).slice(0, 20);
};

export const getProductByItemId = (products: Product[], id: string) => {
  return products.find(e => e.itemId === id);
};

export const getMayLikeProducts = (
  products: Product[],
  category: Categories,
) => {
  return products.filter(e => e.category === category).slice(10, 20);
};
