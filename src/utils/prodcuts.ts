import { Product, ProductCategory } from '../types';

export type SortType = 'new' | 'popular' | 'old';

interface GetVisibleProductsParams {
  products: Product[];
  category: Product['category'];
  sortType: SortType;
  itemsPerPage: number;
  currentPage: number;
}

interface VisibleProductsResult {
  items: Product[];
  total: number;
  totalPages: number;
}

function sortProducts(products: Product[], sortType: SortType): Product[] {
  const copy = [...products];

  switch (sortType) {
    case 'new':
      return copy.sort((a, b) => b.year - a.year);
    case 'old':
      return copy.sort((a, b) => a.year - b.year);
    case 'popular':
      return copy.sort((a, b) => a.price - b.price);
    default:
      return copy;
  }
}

export function getVisibleProducts({
  products,
  category,
  sortType,
  itemsPerPage,
  currentPage,
}: GetVisibleProductsParams): VisibleProductsResult {
  const filtered = products.filter(p => p.category === category);
  const sorted = sortProducts(filtered, sortType);

  const total = sorted.length;
  const totalPages = Math.max(1, Math.ceil(total / itemsPerPage));

  const start = (currentPage - 1) * itemsPerPage;
  const items = sorted.slice(start, start + itemsPerPage);

  return { items, total, totalPages };
}

export function isValidCategory(value: string): value is ProductCategory {
  return ['phones', 'tablets', 'accessories'].includes(
    value as ProductCategory,
  );
}
