import { Product } from '../types/Product';

export const customArray = (array: Product[]) => {
  const newArray = array.slice();

  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    const temp = newArray[i];

    newArray[i] = newArray[j];
    newArray[j] = temp;
  }

  return newArray;
};
