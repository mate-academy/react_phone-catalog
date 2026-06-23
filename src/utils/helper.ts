import { CatalogProducts, PerPageType, SortType } from '../types/Types';

export const getSortedProducts = (
  products: CatalogProducts[],
  sort: SortType,
) => {
  const sortedProducts = [...products];

  switch (sort) {
    case SortType.AGE:
      return sortedProducts.sort((item1, item2) => item2.year - item1.year);
    case SortType.TITLE:
      return sortedProducts.sort((item1, item2) =>
        item1.name.localeCompare(item2.name),
      );
    case SortType.PRICE:
      return sortedProducts.sort((item1, item2) => item1.price - item2.price);
    default:
      return sortedProducts;
  }
};

export const getPaginatedProducts = (
  products: CatalogProducts[],
  page: number,
  perPage: number | PerPageType,
) => {
  if (perPage === PerPageType.ALL) {
    return products;
  }

  const itemsPerPage = Number(perPage);
  const currentPage = Math.max(1, page);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return products.slice(startIndex, endIndex);
};

export const getColorHex = (color: string): string => {
  const normalizedColor = color.toLowerCase().replace(/[\s-]+/g, '');

  const colorMap: Record<string, string> = {
    midnight: '#343b43',
    spacegray: '#5f5f5f',
    starlight: '#faf7f2',
    gold: '#d4c9b1',
    silver: '#e2e4e1',
    rosegold: '#b76e79',
    graphite: '#4b4845',
    sierrablue: '#a7c1d3',
    pink: '#e5ddea',
    purple: '#e5ddea',
    spaceblack: '#4b4845',
  };

  return colorMap[normalizedColor] || color;
};
