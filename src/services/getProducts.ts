import { SortByKeys } from '../constants';
import { Categories } from '../types/Categories';
import { Product } from '../types/Product';

export const getFilteredData = (
  data: Product[],
  category: string,
  sortBy: SortByKeys,
): Product[] => {
  // Фільтруємо продукти за категорією
  const filtered = data.filter(e => e.category === category);

  // Сортуємо копію масиву, щоб не мутувати оригінальний
  const sorted = [...filtered].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'nameDesc':
        return b.name.localeCompare(a.name);
      case 'newest':
        return b.year - a.year;
      case 'price':
        return a.price - b.price;
      case 'priceDesc':
        return b.price - a.price;
      default:
        return 0; // Якщо немає значення для сортування
    }
  });

  return sorted;
};

export const getHotPrice = (products: Product[]): Product[] => {
  const sortedByPrice = [...products].sort((a, b) => {
    const discountA = a.fullPrice - a.price;
    const discountB = b.fullPrice - b.price;

    return discountB - discountA; // Спочатку найбільша знижка
  });

  return sortedByPrice.slice(0, 20);
};

export const getBrandNew = (products: Product[]): Product[] => {
  const sortedByYear = [...products].sort((a, b) => b.year - a.year);

  return sortedByYear.slice(0, 20);
};

export const getProductByItemId = (
  products: Product[],
  id: string,
): Product | undefined => {
  return products.find(e => e.itemId === id);
};

export const getMayLikeProducts = (
  products: Product[],
  category: Categories,
): Product[] => {
  return products.filter(e => e.category === category).slice(10, 20);
};
