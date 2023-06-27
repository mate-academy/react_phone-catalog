import { useState } from 'react';

import { ProductCard } from '../ProductCard/ProductCard';
import { Product } from '../../types/product';
import { Slider } from '../UI/Slider/Slider';
import { IconButton } from '../UI/IconButton/IconButton';
import leftArrow from '../../assets/svg/l_arrow.svg';
import rightArrow from '../../assets/svg/r_arrow.svg';
import './ProductCardSlider.scss';

type ProductCardSliderProps = {
  title: string;
  products: Product[];
};

export const ProductCardSlider = ({
  title,
  products,
}: ProductCardSliderProps) => {
  const [slide, setSlide] = useState(0);

  const maxTransition = products.length / 4 - 1;

  const handleClick = (operation: 1 | -1) => {
    setSlide(prevSlide => {
      if (operation === 1) {
        return Math.min(maxTransition, prevSlide + 1);
      }

      return Math.max(0, prevSlide - 1);
    });
  };

  return (
    <div className="cards-container">
      <div className="cards-container__header">
        <h1 className="cards-container__title">{title}</h1>

        <div className="cards-container__controls">
          <IconButton
            onClick={() => handleClick(-1)}
            svg={leftArrow}
            isDisabled={slide === 0}
            alt="Sliders left arrow button"
          />

          <IconButton
            onClick={() => handleClick(1)}
            svg={rightArrow}
            isDisabled={slide === maxTransition}
            alt="Sliders right arrow button"
          />
        </div>
      </div>

      <Slider slide={slide}>
        {products.map(product => (
          <ProductCard key={product.itemId} product={product} />
        ))}
      </Slider>
    </div>
  );
};
