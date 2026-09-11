import { Product } from '../Pages/useAllProducts/useAllProducts'; // підправте шлях

export const getSuggestedProducts = (
  allProducts: Product[],
  currentProductId: string,
  count = 8,
): Product[] => {
  const others = allProducts.filter(p => String(p.id) !== currentProductId);
  const shuffled = [...others].sort(() => Math.random() - 0.5);

  return shuffled.slice(0, count);
};
