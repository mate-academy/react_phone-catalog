import type { Product } from '../types/product';

const normalizeSearchText = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();

const getSearchableText = (product: Product) =>
  [
    product.name,
    product.color,
    product.capacity,
    product.ram,
    product.screen,
    product.itemId,
    product.category,
    product.year,
  ]
    .filter(value => value !== undefined && value !== null)
    .map(String)
    .map(normalizeSearchText)
    .join(' ');

export const productMatchesQuery = (product: Product, query: string) => {
  const tokens = normalizeSearchText(query).split(/\s+/).filter(Boolean);

  if (tokens.length === 0) {
    return true;
  }

  const searchableText = getSearchableText(product);

  return tokens.every(token => searchableText.includes(token));
};
