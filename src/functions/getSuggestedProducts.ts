import { getPhones } from './getPhones';

import { Phone } from '../types/Phone';

const returnRandomList = (products: Phone[]) => {
  const resultRandomList: Phone[] = [];

  const max = products.length;

  const getRandomProduct = () => (
    Math.floor(Math.random() * max)
  );

  for (let i = 0; i < 10 && i < max; i += 1) {
    let randomProduct = products[getRandomProduct()];

    while (resultRandomList.includes(randomProduct)) {
      randomProduct = products[getRandomProduct()];
    }

    resultRandomList.push(randomProduct);
  }

  return resultRandomList;
};

export const getSuggestedProducts = () => {
  return getPhones()
    .then(returnRandomList);
};
