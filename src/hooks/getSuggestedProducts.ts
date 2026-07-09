import { getProducts } from '../api/api';

type Category = 'phones' | 'tablets' | 'accessories';

export const getSuggestedProducts = (category: Category, productId: string) => {
  const sameCategory = getProducts().then(data => {
    return data
      .filter(
        product =>
          product.category === category && product.itemId !== productId,
      )
      .sort(() => Math.random() - 0.5);
  });

  return sameCategory;
};
