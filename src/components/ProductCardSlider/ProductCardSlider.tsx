import { useCallback, useEffect, useState } from 'react';

import { ProductCard } from '../ProductCard/ProductCard';
import { Product } from '../../types/product';
import { Slider } from '../UI/Slider/Slider';
import { IconButton } from '../UI/IconButton/IconButton';
import leftArrow from '../../assets/svg/l_arrow.svg';
import rightArrow from '../../assets/svg/r_arrow.svg';
import './ProductCardSlider.scss';
import { getVisibleNumberOfProducts } from '../../helpers/dom';

type ProductCardSliderProps = {
  title: string;
  products: Product[];
};

export const ProductCardSlider = ({
  title,
  products,
}: ProductCardSliderProps) => {
  const [slide, setSlide] = useState(0);

  const maxTransition = products.length / getVisibleNumberOfProducts() - 1;

  const handleClick = useCallback(
    (operation: 1 | -1) => {
      setSlide(prevSlide => {
        const newSlide = prevSlide + operation;

        if (operation === 1) {
          return Math.min(maxTransition, newSlide);
        }

        return Math.max(0, newSlide);
      });
    },
    [maxTransition],
  );

  useEffect(() => {
    setSlide(0);
  }, [maxTransition]);

  return (
    <div className="cards-container">
      <div className="cards-container__header">
        <h1 className="cards-container__title">{title}</h1>

        <div className="cards-container__controls">
          <IconButton
            onClick={() => handleClick(-1)}
            svg={leftArrow}
            isDisabled={slide === 0}
            alt="Slide left"
          />

          <IconButton
            onClick={() => handleClick(1)}
            svg={rightArrow}
            isDisabled={slide === maxTransition}
            alt="Slide right"
          />
        </div>
      </div>

      <Slider slide={slide} gap={16}>
        {products.map(product => (
          <ProductCard key={product.itemId} product={product} />
        ))}
      </Slider>
    </div>
  );
};
