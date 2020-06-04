import React from 'react';
import ProductsSlider from '../ProductSlider/ProductsSlider';

type Props = {
  preparedPhones: Phone[];
};

const BrandNewModels: React.FC<Props> = ({ preparedPhones }) => {
  const preparedPhonesToBrandNewModel = preparedPhones
    .filter((phone: Phone) => phone.discount === 0)
    .sort((a: Phone, b: Phone) => (a.age) - (b.age));

  return (
    <ProductsSlider preparedPhones={preparedPhonesToBrandNewModel} article="Brand new models" />
  );
};


export default BrandNewModels;
