import React from 'react';
import ProductsSlider from '../ProductSlider/ProductsSlider';

type Props = {
  preparedPhones: Phone[];
};

const YouMayAlsoLike: React.FC<Props> = ({ preparedPhones }) => {
  const randomArray = (array: Phone[]) => {
    let j;
    let temp;

    for (let i = array.length - 1; i > 0;) {
      i -= 1;
      j = Math.floor(Math.random() * (i + 1));
      temp = array[j];
      array[j] = array[i];
      array[i] = temp;
    }

    return array;
  };

  const preparedPhonesToHotPricdes = randomArray(preparedPhones);

  return (
    <ProductsSlider preparedPhones={preparedPhonesToHotPricdes} article="You may also like" />
  );
};


export default YouMayAlsoLike;
