import { useState } from 'react';
import cn from 'classnames';
import './style.scss';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';
import {
  animationString,
  itemMargin,
  itemsPerSlide,
  itemWidth,
  sliderWidth,
} from '../../helpers/constants/constants';

type ProductSliderProps = {
  title: string;
  products: Product[];
};

export const ProductSlider: React.FC<ProductSliderProps> = ({
  title,
  products,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const listSize = products.length * 272 + (products.length - 1) * 16;
  const isSlideLast = currentSlide === products.length - itemsPerSlide;
  const isSlideFirst = currentSlide === 0;

  const handlePrevButton = () => {
    setCurrentSlide((prev) => prev - 1);
  };

  const handleNextButton = () => {
    setCurrentSlide((prev) => prev + 1);
  };

  return (
    <div className="product-slider">
      <div className="product-slider__info">
        <h3 className="product-slider__title title title--large">{title}</h3>

        <div className="product-slider__buttons">
          <button
            disabled={isSlideFirst}
            type="button"
            className="product-slider__button"
            aria-label="slider-btn"
            onClick={handlePrevButton}
          >
            <i
              className={cn('icon', 'icon--arrow-left', {
                'icon--arrow-left--disabled': isSlideFirst,
              })}
            />
          </button>

          <button
            disabled={isSlideLast}
            type="button"
            className="product-slider__button"
            aria-label="slider-btn"
            onClick={handleNextButton}
          >
            <i
              className={cn('icon', 'icon--arrow-right', {
                'icon--arrow-right--disabled': isSlideLast,
              })}
            />
          </button>
        </div>
      </div>

      <div
        style={{ widows: sliderWidth }}
        className="product-slider__content-wrap"
      >
        <ul
          style={{
            width: listSize,
            translate: currentSlide * (-itemWidth - itemMargin),
            transition: animationString,
          }}
          className="product-slider__content"
        >
          {products.map((product) => {
            return (
              <li key={product.id} className="product-slider__item">
                <ProductCard product={product} />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
