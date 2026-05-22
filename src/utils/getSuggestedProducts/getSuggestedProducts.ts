import productsFromServer from '../../../public/api/products.json';

export const getSuggestedProducts = (category: string) => {
  return [...productsFromServer]
    .filter(p => p.category === category)
    .sort((a, b) => {
      const sortYear = b.year - a.year;

      return sortYear !== 0 ? sortYear : b.price - a.price;
    });
};
