import { Product } from '../types/Product';

export function getSuggestedProducts(
  products: Product[],
  selectedCategory: string,
  selectedItemId: string,
) {
  return products
    .filter(
      product =>
        product.category === selectedCategory &&
        product.itemId !== selectedItemId,
    )
    .sort(() => Math.random() - 0.5);
}
