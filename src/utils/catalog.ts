import { ProductCatalogItem } from '../types/ProductCatalogItem';

type ProductSortTypes = 'newest' | 'alphabetically' | 'cheapest' | 'hotPrice';

export const getSortedProducts = (
  products: ProductCatalogItem[],
  sortType: ProductSortTypes,
): ProductCatalogItem[] => {
  switch (sortType) {
    case 'newest':
      return products.sort(
        (a: ProductCatalogItem, b: ProductCatalogItem) => b.year - a.year,
      );
    case 'alphabetically':
      return products.sort((a: ProductCatalogItem, b: ProductCatalogItem) =>
        b.name.localeCompare(a.name),
      );
    case 'cheapest':
      return products.sort(
        (a: ProductCatalogItem, b: ProductCatalogItem) =>
          b.fullPrice - a.fullPrice,
      );
    case 'hotPrice':
      return products.sort(
        (a, b) => b.fullPrice - b.price - (a.fullPrice - a.price),
      );
  }
};
