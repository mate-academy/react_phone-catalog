import React from 'react';
import { SliderProducts } from './SliderProducts';
import { Heading } from '../Heading/Heading';

export const ShowcaseBlock = ({ title, selectedProduct }: ShowcaseBlockProps) => {
  return (
    <>
      <Heading title={title} />
      <SliderProducts
        title={title}
        selectedProduct={selectedProduct}
      />
    </>
  );
};
