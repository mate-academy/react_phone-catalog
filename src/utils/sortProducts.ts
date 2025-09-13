import { Product } from 'types/ProductPreview';

export function getSortedProducts(products: Product[], sortBy: string) {
  const sortedProducts = [...products];

  if (sortBy === 'year') {
    return sortedProducts.sort((a, b) => {
      return b.year - a.year;
    });
  }

  if (sortBy === 'hot-price') {
    return sortedProducts.sort((a, b) => {
      return b.fullPrice - b.price - (a.fullPrice - a.price);
    });
  }

  return sortedProducts;
}
