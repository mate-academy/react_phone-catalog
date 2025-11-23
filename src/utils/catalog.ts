import { ProductCatalogItem } from '../types/ProductCatalogItem';

export enum ProductSortTypes {
  Age = 'age',
  Title = 'title',
  Price = 'price',
  HotPrice = 'hotPrice',
}

export const getSortedProducts = (
  products: ProductCatalogItem[],
  sortType: ProductSortTypes,
): ProductCatalogItem[] => {
  switch (sortType) {
    case ProductSortTypes.Age:
      return [...products].sort(
        (a: ProductCatalogItem, b: ProductCatalogItem) => b.year - a.year,
      );
    case ProductSortTypes.Title:
      return [...products].sort(
        (a: ProductCatalogItem, b: ProductCatalogItem) =>
          a.name.localeCompare(b.name),
      );
    case ProductSortTypes.Price:
      return [...products].sort(
        (a: ProductCatalogItem, b: ProductCatalogItem) => a.price - b.price,
      );
    case ProductSortTypes.HotPrice:
      return [...products].sort(
        (a, b) => b.fullPrice - b.price - (a.fullPrice - a.price),
      );
  }
};
