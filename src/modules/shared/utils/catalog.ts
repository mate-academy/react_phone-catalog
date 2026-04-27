import { CATEGORY_EMPTY_LABELS, CATEGORY_LABELS } from '../constants/catalog';
import {
  Category,
  PerPageOption,
  ProductDetails,
  ProductSummary,
  SortType,
} from '../types/catalog';

export const getCategoryLabel = (category: Category) =>
  CATEGORY_LABELS[category];

export const getCategoryEmptyLabel = (category: Category) =>
  CATEGORY_EMPTY_LABELS[category];

export const getDiscountAmount = (product: ProductSummary) =>
  product.fullPrice - product.price;

export const sortProducts = (products: ProductSummary[], sort: SortType) => {
  const sortedProducts = [...products];

  switch (sort) {
    case 'title':
      return sortedProducts.sort((first, second) =>
        first.name.localeCompare(second.name),
      );

    case 'price':
      return sortedProducts.sort((first, second) => first.price - second.price);

    case 'age':
    default:
      return sortedProducts.sort((first, second) => second.year - first.year);
  }
};

export const paginateProducts = (
  products: ProductSummary[],
  page: number,
  perPage: PerPageOption,
) => {
  if (perPage === 'all') {
    return products;
  }

  const start = (page - 1) * perPage;

  return products.slice(start, start + perPage);
};

export const getPageNumbers = (currentPage: number, totalPages: number) => {
  const pages = new Set<number>([1, totalPages, currentPage]);

  if (currentPage > 1) {
    pages.add(currentPage - 1);
  }

  if (currentPage < totalPages) {
    pages.add(currentPage + 1);
  }

  return [...pages].sort((first, second) => first - second);
};

export const formatPrice = (price: number) => `$${price}`;

export const normalizeColorToken = (value: string) =>
  value.toLowerCase().replace(/\s+/g, '-');

export const formatColorLabel = (value: string) =>
  value
    .split(/[\s-]/)
    .filter(Boolean)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

export const getProductVariant = (
  variants: ProductDetails[],
  capacity: string,
  color: string,
) =>
  variants.find(
    variant => variant.capacity === capacity && variant.color === color,
  );

export const getProductImagePath = (path: string) => `/${path}`;
