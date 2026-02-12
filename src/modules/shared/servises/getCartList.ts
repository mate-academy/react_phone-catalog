import type { Product } from '../types/Product';

export const getCartList = (listOfIds: string[], products: Product[]) => {
  const resultList: Product[] = [];

  listOfIds.forEach(productId => {
    resultList.push(
      [...products].filter(product => product.itemId === productId)[0],
    );
  });

  return resultList;
};
