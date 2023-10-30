import { Product } from '../types/Product';

function getRandomIndex(min: number, max: number) {
  const rand = min - 0.5 + Math.random() * (max - min + 1);

  return Math.round(rand);
}

export const getSuggestedProducts = (products: Product[]) => {
  const suggestProducts: Product[] = [];
  const suggestProductsCount = 10;
  const productsCount = products.length - 1;

  for (let i = 0; i <= suggestProductsCount; i += 1) {
    const randomIdx = getRandomIndex(0, productsCount);
    const suggestProduct = products[randomIdx];
    const suggestProductIsSelected = suggestProducts
      .some(product => product === suggestProduct);

    if (!suggestProductIsSelected) {
      suggestProducts.push(suggestProduct);
    }
  }

  return suggestProducts;
};
