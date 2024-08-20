import React from 'react';
import { useProductSlider } from '../ProductSlider';
import { Product } from '../../../types/product';

export type SliderProps = {
  products: Product[];
  isLoading: boolean;
};

export const NewModelsSlider: React.FC<SliderProps> = ({
  products,
  isLoading,
}) => {
  const newModels = products.filter(product => product.year === 2022);
  const productsByModel = newModels.slice().sort((a, b) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();

    const isModelA = nameA.includes('iphone 14 pro');
    const isModelB = nameB.includes('iphone 14 pro');

    if (isModelA && !isModelB) {
      return -1;
    } else if (!isModelA && isModelB) {
      return 1;
    } else {
      return nameB.localeCompare(nameA);
    }
  });

  const { sliderComponent: NewSlider } = useProductSlider(
    productsByModel,
    isLoading,
    false,
    false,
  );

  return <div>{NewSlider}</div>;
};
