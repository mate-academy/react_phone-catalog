import { Category, Product } from '../types/Product';

export enum SortType {
  Newest = 'age',
  Alphabetically = 'title',
  Cheapest = 'price',
}

export function selectCatalogProducts(
  products: Product[],
  category: Category,
  query: string,
  sort: SortType,
) {
  const categoryProducts = products.filter(
    product => product.category === category,
  );
  const filteredProducts = categoryProducts.filter(product =>
    product.name.toLowerCase().includes(query),
  );
  const sortedProducts = [...filteredProducts].sort((first, second) => {
    switch (sort) {
      case SortType.Alphabetically:
        return first.name.localeCompare(second.name);

      case SortType.Cheapest:
        return first.price - second.price;

      default:
        return second.year - first.year || second.sortOrder - first.sortOrder;
    }
  });

  return { categoryProducts, filteredProducts, sortedProducts };
}
