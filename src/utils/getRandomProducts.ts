import { UpdatedProduct } from '../modules/shared/Types/types';

function getRandomElement(array: UpdatedProduct[]) {
  const randomIndex = Math.floor(Math.random() * array.length);

  return array[randomIndex];
}

export function getRandomProducts(
  list: UpdatedProduct[],
  newListLength: number,
) {
  const listOfRandomProducts = [] as UpdatedProduct[];

  for (let i = 0; i <= newListLength; i++) {
    const newRandomItem = getRandomElement(list);

    if (listOfRandomProducts.includes(newRandomItem)) {
      listOfRandomProducts.push(getRandomElement(list));
    } else {
      listOfRandomProducts.push(newRandomItem);
    }
  }

  return listOfRandomProducts;
}
