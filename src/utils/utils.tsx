import { Product } from 'src/types/Types';

export const getSuggestedProducts = (products: Product[], category: string) => {
  return products
    .filter(prod => prod.category === category)
    .sort((a, b) => b.year - a.year);
};

export const scrollToTop = (behavior: ScrollBehavior = 'instant') => {
  window.scrollTo({
    top: 0,
    behavior,
  });
};
