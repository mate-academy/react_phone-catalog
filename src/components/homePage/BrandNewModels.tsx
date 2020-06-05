import React from 'react';
import ProductsSlider from '../ProductSlider/ProductsSlider';

type Props = {
  preparedPhones: Item[];
};

const BrandNewModels: React.FC<Props> = ({ preparedPhones }) => {
  const preparedPhonesToBrandNewModel = preparedPhones
    .filter((phone: Item) => phone.discount === 0)
    .sort((a: Item, b: Item) => (a.age) - (b.age));

  return (
    <ProductsSlider preparedPhones={preparedPhonesToBrandNewModel} article="Brand new models" />
  );
};


export default BrandNewModels;
