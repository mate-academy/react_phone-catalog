import { Product } from '../../types/Product';

const LENGTH = 16;

const shuffleArray = (products: Product[]) => {
  const newArray = products.slice();

  for (let i = newArray.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));

    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }

  return newArray;
};

export const getSuggestedProducts = (productsFromServer: Product[]) => {
  const shuffledProducts = shuffleArray(productsFromServer);

  return shuffledProducts.slice(0, LENGTH);
};
