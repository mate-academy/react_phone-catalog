import { CategoryCard } from '../types/CategoryCard';
import { Product } from '../types/Product';

export const scrollOnTop = (point = 0) =>
  window.scrollTo({ top: point, behavior: 'smooth' });

export const getProductsPhones = (allProducts: Product[]) => {
  const result = [...allProducts];

  return result.filter(product => product.category === 'phones');
};

export const getNewestYearProducts = (allProducts: Product[]) => {
  if (allProducts.length === 0) {
    return [];
  }

  const result = [...allProducts];

  const maxYear = result.reduce(
    (max, product) => (product.year > max ? product.year : max),
    result[0].year,
  );

  return result.filter(product => product.year === maxYear).slice(0, 20);
};

export const getBiggestSaleProducts = (allProducts: Product[]) => {
  const result = [...allProducts];

  const sortedBySale = result.sort(
    (p1, p2) => p2.fullPrice - p2.price - (p1.fullPrice - p1.price),
  );

  return sortedBySale.slice(0, 20);
};

export const adaptivePaginationPages = (
  pages: number[],
  activePage: number,
) => {
  if (pages.length <= 7) {
    return pages;
  }

  const emptyElement = ['...'];
  const activePageIndex = pages.indexOf(activePage);
  const fifthFromEndIndex = pages.length - 1 - 4;

  if (activePageIndex < 4) {
    const firstPart = pages.slice(0, 5);

    return [...firstPart, ...emptyElement, pages[pages.length - 1]];
  }

  if (activePageIndex >= 4 && activePageIndex <= fifthFromEndIndex) {
    const middlePart = pages.slice(activePageIndex - 1, activePageIndex + 2);

    return [
      pages[0],
      ...emptyElement,
      ...middlePart,
      ...emptyElement,
      pages[pages.length - 1],
    ];
  }

  if (activePageIndex > fifthFromEndIndex) {
    const lastPart = pages.slice(fifthFromEndIndex);

    return [pages[0], ...emptyElement, ...lastPart];
  }

  return [];
};

export const getCategoriesCards = (allProducts: Product[]): CategoryCard[] => {
  const getProductsByCategoryName = (categoryName: string) =>
    allProducts.filter(product => product.category === categoryName);

  const getImagesByCategory = (category: string) => {
    switch (category) {
      case 'phones':
        return './img/category-images/category-phone.png';
      case 'tablets':
        return './img/category-images/category-tablets.png';
      case 'accessories':
        return './img/category-images/category-accessories.png';
      default:
        return '';
    }
  };

  const categories = ['phones', 'tablets', 'accessories'];

  return categories.map(category => ({
    name: category,
    title: category.charAt(0).toUpperCase() + category.slice(1),
    amount: getProductsByCategoryName(category).length,
    image: getImagesByCategory(category),
  }));
};

export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const correctColor = (nameColor: string) => {
  switch (nameColor) {
    case 'spacegray':
      return '#4C4C4C';
    case 'midnightgreen':
      return '#5F7170';
    case 'gold':
      return '#FCDBC1';
    case 'purple':
      return '#d2adef';
    case 'midnight':
      return '#4a4a4b';
    case 'rosegold':
      return '#cc8f98';
    case 'green':
      return '#7dd3c5';
    case 'blue':
      return '#277592';
    case 'graphite':
      return '#5a5c5e';
    case 'sierrablue':
      return '#97b7d8';

    default:
      return nameColor;
  }
};
