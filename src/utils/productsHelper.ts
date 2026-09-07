import { FilterSort } from '../types/FilterSort';
import { ProductGeneral } from '../types/ProductGeneral';

export function getFiltredProducts(
  products: ProductGeneral[],
  callback: (product: ProductGeneral) => boolean,
): ProductGeneral[] {
  const filtredProducts = products.filter(callback);

  return filtredProducts;
}

export function getSortedProducts(
  products: ProductGeneral[],
  callback: (a: ProductGeneral, b: ProductGeneral) => number,
  needCount?: number,
): ProductGeneral[] {
  const sortedProducts = [...products].sort(callback);

  return needCount ? sortedProducts.splice(0, needCount) : sortedProducts;
}

export function getPreparedProducts(
  products: ProductGeneral[],
  query: string,
  sortField: FilterSort,
): ProductGeneral[] {
  let filteredProducts = products;

  if (query) {
    filteredProducts = getFiltredProducts(products, pr =>
      pr.name.toLowerCase().includes(query.toLowerCase()),
    );
  }

  const preparedProducts = getSortedProducts(filteredProducts, (a, b) => {
    switch (sortField) {
      case FilterSort.Newest:
        return (
          b.year - a.year ||
          b.name.toLowerCase().localeCompare(a.name.toLowerCase())
        );
      case FilterSort.Alphabetically:
        return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
      case FilterSort.Cheapest:
        return a.price - b.price;
    }
  });

  return preparedProducts;
}

export function getProductsWithPagination(
  products: ProductGeneral[],
  perPage: number,
  currentPage: number,
) {
  const total = Math.ceil(products.length / perPage);
  const startIndex = (currentPage - 1) * perPage;
  const endIndex =
    currentPage === total ? products.length : startIndex + perPage;

  return products.slice(startIndex, endIndex);
}

export function getSuggestedProducts(
  products: ProductGeneral[],
  needCount = 10,
) {
  const randomlyProducts: ProductGeneral[] = [];

  for (let i = 1; i <= needCount; i++) {
    randomlyProducts.push(
      products[Math.floor(Math.random() * products.length)],
    );
  }

  return randomlyProducts;
}
