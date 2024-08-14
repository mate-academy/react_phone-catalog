import { Accessorie } from '../types/accessories';
import { Phone } from '../types/phone';
import { Tablet } from '../types/tablets';

export const uniqueProducts = (products: (Phone | Tablet | Accessorie)[]) => {
  const seen = new Set();

  return products.filter(product => {
    const duplicate = seen.has(product.id);

    seen.add(product.id);

    return !duplicate;
  });
};
