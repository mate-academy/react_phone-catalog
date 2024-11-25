import { Product } from '../types/Product';

export const getSuggestedProducts = (
  phones: Product[],
  tablets: Product[],
  accessories: Product[],
) => {
  const shuffle = (arr: Product[], num = arr.length) => {
    return [...arr].sort(() => Math.random() - 0.5).slice(0, num);
  };

  const suggestProducts = [
    ...shuffle(phones, 4),
    ...shuffle(tablets, 4),
    ...shuffle(accessories, 4),
  ];

  return shuffle(suggestProducts);
};
