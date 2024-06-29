import { ProductGeneral } from '../types/ProductGeneral';

export function getSuggestedProducts(product: ProductGeneral[]) {
  const shuffledArray = [...product];

  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }

  return shuffledArray;
}
