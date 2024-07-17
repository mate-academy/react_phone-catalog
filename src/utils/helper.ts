import { Product } from '../types/Product';

export const getTotalPrice = (products: Product[]) => {
  return products.map(item => item.price).reduce((a, b) => a + b, 0);
};

export const getNumberOfProductsByCategory = (
  products: Product[],
  category: string,
) => {
  return products.filter(item => item.category === category).length;
};

export const getUniqueProducts = (products: Product[]) => {
  const newProductsList: Product[] = [];
  const ids: number[] = [];

  products.forEach((product: Product) => {
    if (!ids.includes(product.id)) {
      ids.push(product.id);
      newProductsList.push(product);
    }
  });

  return newProductsList;
};

export const getFirstCapitalLetter = (word: string) => {
  return word[0].toUpperCase() + word.slice(1, word.length);
};

export const getRandomProductsList = (products: Product[]) => {
  const newProductsList = [...products];

  for (let i = newProductsList.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = newProductsList[i];

    newProductsList[i] = newProductsList[j];
    newProductsList[j] = temp;
  }

  return newProductsList;
};
