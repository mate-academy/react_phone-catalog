import type { Product, SortType } from '../types';

export function sortProducts(products: Product[], sort: SortType | null) {
  const copy = [...products];

  switch (sort) {
    case 'age':
      return copy.sort((a, b) => b.year - a.year);
    case 'title':
      return copy.sort((a, b) => a.name.localeCompare(b.name));
    case 'price':
      return copy.sort((a, b) => a.price - b.price);
    default:
      return copy;
  }
}

export function filterByQuery(products: Product[], query: string) {
  const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean);

  if (words.length === 0) {
    return products;
  }

  return products.filter(product => {
    const name = product.name.toLowerCase();

    return words.every(word => name.includes(word));
  });
}

const COLOR_HEX_MAP: Record<string, string> = {
  spacegray: '#535150',
  spaceblack: '#3b3b3c',
  midnight: '#1e1e24',
  midnightgreen: '#5b6459',
  graphite: '#54524f',
  sierrablue: '#a7c6da',
  starlight: '#f0e5d3',
  rosegold: '#f4c2c2',
};

export function getColorHex(color: string): string {
  const key = color.toLowerCase().replace(/\s+/g, '');

  return COLOR_HEX_MAP[key] || key;
}
