import React from 'react';
import ProductsSlider from '../ProductSlider/ProductsSlider';

type Props = {
  preparedPhones: Item[];
};

const HotPrices: React.FC<Props> = ({ preparedPhones }) => {
  const preparedPhonesToHotPricdes = preparedPhones
    .filter((phone: Item) => phone.discount !== 0)
    .sort((a: Item, b: Item) => (b.price * (b.discount / 100)) - (a.price * (a.discount / 100)));

  return (
    <ProductsSlider preparedPhones={preparedPhonesToHotPricdes} article="Hot Prices" />
  );
};


export default HotPrices;
