import { Product } from '../types/Product';
import { ProductType } from '../types/ProductType';

export const getSuggestedProducts = (products: Product[]) => {
  const shuffle = (arr: Product[], num = arr.length) => {
    return [...arr].sort(() => Math.random() - 0.5).slice(0, num);
  };

  const phones = products.filter(
    ({ category }) => category === ProductType.phones,
  );

  const tablets = products.filter(
    ({ category }) => category === ProductType.tablets,
  );

  const accessories = products.filter(
    ({ category }) => category === ProductType.accessories,
  );

  const suggestProducts = [
    ...shuffle(phones, 4),
    ...shuffle(tablets, 4),
    ...shuffle(accessories, 4),
  ];

  return shuffle(suggestProducts);
};
