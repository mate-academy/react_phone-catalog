import { useState, useRef, useEffect } from 'react';

import { Product } from '../../Types/Product';
import arrowLeft from '../../img/arrow_left.svg';
import arrowRight from '../../img/arrow_right.svg';

import './productSlider.scss';
import { ProductCard } from '../ProductCard/ProductCard';

type Props = {
  products: Product[];
  title: string;
};

export const ProductSlider: React.FC<Props> = ({ products, title }) => {
  const [sliderTransformValue, setSliderTransformValue] = useState(0);
  const slideRef = useRef<HTMLDivElement>(null);
  const [isNewProducts, setIsNewProducts] = useState(false);
  // const slidsesToShow = 4;
  const slidesToScroll = 1;

  useEffect(() => {
    if (title === 'Brand new models') {
      setIsNewProducts(true);
    }
  }, [title]);

  const showNextSlide = () => {
    const slide = slideRef.current;

    if (slide) {
      const slideWidth = slide.offsetWidth * slidesToScroll;

      if (sliderTransformValue < slideWidth * products.length) {
        setSliderTransformValue(sliderTransformValue + slideWidth + 24);
      }
    }
  };

  const showPrevSlide = () => {
    const slide = slideRef.current;

    if (slide) {
      const slideWidth = slide.offsetWidth;

      if (sliderTransformValue > 0) {
        setSliderTransformValue(sliderTransformValue - slideWidth - 24);
      }
    }
  };

  return (
    <div className="product-slider">
      <div className="product-slider__wrapper">
        <div className="product-slider__top">
          <h2 className="product-slider__title">{title}</h2>
          <div className="product-slider__btns">
            <button
              type="button"
              className="product-slider__prevBtn btn-arrows"
              onClick={showPrevSlide}
            >
              <img src={arrowLeft} alt="icon" />
            </button>

            <button
              type="button"
              className="product-slider__nextBtn btn-arrows"
              onClick={showNextSlide}
            >
              <img src={arrowRight} alt="icon" />
            </button>
          </div>
        </div>

        <div className="product-slider__slider">
          {products.map((product: Product) => (
            <div
              key={product.phoneId}
              ref={slideRef}
              className="product-card"
              style={{ transform: `translateX(-${sliderTransformValue}px)` }}
            >
              <ProductCard product={product} newProducts={isNewProducts} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
