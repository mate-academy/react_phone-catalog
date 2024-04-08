import './ProductsSlider.scss';
import React from 'react';
type Props = {
  sliderLeft: () => void;
  sliderRight: () => void;
}
export const ProductsSlider:React.FC<Props> = ({
  sliderLeft,
  sliderRight,
}) => {
  return (
  <div className="product__slider">
    <button
      className='product__button'
      onClick={sliderLeft}
    >
      <span className='product__arrow product__arrow--left'></span>
    </button>

    <button
      className='product__button'
      onClick={sliderRight}
    >
      <span className='product__arrow product__arrow--right'></span>
    </button>
  </div>
  )
};
