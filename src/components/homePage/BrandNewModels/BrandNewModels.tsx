import React from 'react';
import MiniSlider from "../MiniSlider/MiniSlider";

type Props = {
  gadgets: Gadget[];
};

const BrandNewModels: React.FC<Props> = ({ gadgets }) => {
  const preparedPhonesToBrandNewModel = gadgets
    .filter((phone: Gadget) => phone.discount === 0)
    .sort((a: Gadget, b: Gadget) => (a.age) - (b.age));

  return (
    <MiniSlider gadgets={preparedPhonesToBrandNewModel} name="Brand new models" />
  );
};


export default BrandNewModels;
