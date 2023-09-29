import { Phone } from '../types/Phone';

export function getHotPrice(prods: Phone[]) {
  const discountedPhones = prods
    .filter(p => p.fullPrice !== p.price);

  discountedPhones.sort((a, b) => {
    const discountA = a.fullPrice - a.price;
    const discountB = b.fullPrice - b.price;

    return discountB - discountA;
  });

  return discountedPhones;
}
