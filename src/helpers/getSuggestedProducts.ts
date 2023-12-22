import { Item } from '../types/Item';

export const getSuggestedProducts = (products: Item[]) => {
  const resArray: Item[] = [];
  const productsLength = products.length;

  for (let i = 0; i < (productsLength > 30 ? 30 : productsLength); i += 1) {
    let randomProduct: Item;

    do {
      const randomIndex = Math.floor(Math.random() * products.length);

      randomProduct = products[randomIndex];
    } while (resArray.includes(randomProduct));

    resArray.push(randomProduct);
  }

  return resArray;
};
