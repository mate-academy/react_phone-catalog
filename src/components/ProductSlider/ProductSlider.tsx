import React from 'react';
/* import { ProductCard } from '../../ProductCard'; */

type ProductSliderProps = {
  title: string;
}

export const ProductSlider: React.FC<ProductSliderProps> = ({title}) => {

  return (
    <div>
      <h2>
        {title}
      </h2>
      ProductCards
    </div>
  )
  }

