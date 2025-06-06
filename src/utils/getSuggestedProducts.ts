import { Products } from '../types/Products';

export function getSuggestedProducts(products: Products[]) {
  const resultat: Products[] = [];

  while (resultat.length < 10) {
    const randomIndex = Math.floor(Math.random() * products.length);

    if (resultat.includes(products[randomIndex])) {
      continue;
    }

    resultat.push(products[randomIndex]);
  }

  return resultat;
}
