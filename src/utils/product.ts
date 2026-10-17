import { Product } from '../types/Product';

export function getCategoryProductCount(products: Product[], category: string) {
  return products.filter(product => {
    return product.category === category;
  }).length;
}

export function getProductIndex(
  products: Product[],
  currentIndex: number,
  direction: 'next' | 'prev',
  cardsPerView: number,
) {
  const maxIndex = Math.max(products.length - cardsPerView, 0);

  if (direction === 'next') {
    return Math.min(currentIndex + 1, maxIndex);
  }

  return Math.max(currentIndex - 1, 0);
}

export function getNumbersLength(_value: unknown, index: number) {
  return index + 1;
}
