import React, { useState } from 'react';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';
import './ProductsSlider.scss';

type Props = {
  title: string,
  sortProducts: Product[],
};

export const ProductsSlider: React.FC<Props> = ({ title, sortProducts }) => {
  const screenWidth = window.screen.width;

  let sliderWidthAndPadding = 1136 + 16; // mainBlock + gap
  let disabledPoint = (-3456);

  if (screenWidth > 1024 && screenWidth < 1279) {
    sliderWidthAndPadding = 992 + 16;
    disabledPoint = (-4032);
  } else if (screenWidth > 768 && screenWidth < 1023) {
    sliderWidthAndPadding = 680 + 16;
    disabledPoint = (-4176);
  } else if (screenWidth > 500 && screenWidth < 767) {
    sliderWidthAndPadding = 448 + 16;
    disabledPoint = (-4176);
  } else if (screenWidth > 320 && screenWidth < 499) {
    sliderWidthAndPadding = 292 + 12;
    disabledPoint = (-2736);
  }

  const [offsetSlider, setOffsetSlider] = useState(0);

  const handlerPrevHotProduct = () => {
    setOffsetSlider((prevState) => prevState + sliderWidthAndPadding);
  };

  const handlerNextHotProduct = () => {
    setOffsetSlider((prevState) => prevState - sliderWidthAndPadding);
  };

  return (
    <div className="ProductsSlider">
      <div className="ProductsSlider__header">
        <h1 className="ProductsSlider__block-title">{title}</h1>
        <div className="ProductsSlider__buttons">
          <button
            type="button"
            className="ProductsSlider__button"
            disabled={offsetSlider === 0}
            onClick={handlerPrevHotProduct}
          >
            &#60;
          </button>
          <button
            type="button"
            className="ProductsSlider__button"
            disabled={offsetSlider === disabledPoint}
            onClick={handlerNextHotProduct}
          >
            &#62;
          </button>
        </div>
      </div>
      <div className="ProductsSlider__mainBlock">
        <div
          className="ProductsSlider__list"
          style={{
            transform: `translateX(${offsetSlider}px)`,
          }}
        >
          {sortProducts.map(product => (
            <li key={product.id}>
              <ProductCard product={product} />
            </li>
          ))}
        </div>
      </div>
    </div>
  );
};
