import React from 'react';
import { useProductSlider } from '../ProductSlider';
import { SliderProps } from '../NewModelsSlider';

export const HotPricesSlider: React.FC<SliderProps> = ({
  products,
  isLoading,
}) => {
  const productsByDiscount = products.sort((a, b) => b.fullPrice - a.fullPrice);
  const { sliderComponent: HotSlider } = useProductSlider(
    productsByDiscount,
    isLoading,
    false,
    true,
  );

  return <div>{HotSlider}</div>;
};
