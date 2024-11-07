import phones from '../../public/api/phones.json';
import tablets from '../../public/api/tablets.json';
import accessories from '../../public/api/accessories.json';
import { Product } from '../types/Product';

export const getSuggestedProducts = () => {
  const shuffle = (arr: Product[], num = arr.length) => {
    return [...arr].sort(() => Math.random() - 0.5).slice(0, num);
  };

  const suggestProducts = [
    ...shuffle(phones, 4),
    ...shuffle(tablets, 3),
    ...shuffle(accessories, 3),
  ];

  return shuffle(suggestProducts);
};
