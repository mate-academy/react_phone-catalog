/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from 'react';
import { Products } from '../../types/types';

function getRandomElements(arr: Products[], n: number) {
  let number = n;

  if (number > arr.length || number < 0) {
    if (number < 0) {
      return [];
    }

    number = arr.length;
  }

  const shuffled = [...arr];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Swap elements
  }

  return shuffled.slice(0, number);
}

const getSuggestedProducts = (category: string) => {
  const [typeOfGadgets, setTypeOfGadgets] = useState<Products[] | []>([]);

  useEffect(() => {
    fetch('./api/products.json')
      .then(res => res.json())
      .then(data => {
        const filtered = data.filter(
          (item: Products) => item.category === category,
        );

        setTypeOfGadgets(filtered);
      });
  }, [category]);

  const randomItem = getRandomElements(typeOfGadgets, 10);

  return randomItem;
};

export default getSuggestedProducts;
