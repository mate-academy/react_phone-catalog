import products from '../../public/api/products.json';

export const getSuggestedProducts = (currentItemId: string, amount: number) => {
  const shuffled = [...products]
    .filter(product => product.itemId !== currentItemId)
    .sort(() => 0.5 - Math.random());

  return shuffled.slice(0, amount);
};
