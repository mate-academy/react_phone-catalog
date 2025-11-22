import { ProductCatalogItem } from '../types/ProductCatalogItem';

export type ProductSortTypes = 'age' | 'title' | 'price' | 'hotPrice';

export const getSortedProducts = (
  products: ProductCatalogItem[],
  sortType: ProductSortTypes,
): ProductCatalogItem[] => {
  switch (sortType) {
    case 'age':
      return products.sort(
        (a: ProductCatalogItem, b: ProductCatalogItem) => b.year - a.year,
      );
    case 'title':
      return products.sort((a: ProductCatalogItem, b: ProductCatalogItem) =>
        a.name.localeCompare(b.name),
      );
    case 'price':
      return products.sort(
        (a: ProductCatalogItem, b: ProductCatalogItem) =>
          a.fullPrice - b.fullPrice,
      );
    case 'hotPrice':
      return products.sort(
        (a, b) => b.fullPrice - b.price - (a.fullPrice - a.price),
      );
  }
};
