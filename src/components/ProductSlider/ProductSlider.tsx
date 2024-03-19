import { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';

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
  const slidesToScroll = 1;

  const [startX, setStartX] = useState<number | null>(null);
  const [endX, setEndX] = useState<number | null>(null);

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

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setEndX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (startX && endX) {
      const diff = startX - endX;

      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          showNextSlide();
        } else {
          showPrevSlide();
        }
      }
    }

    setStartX(null);
    setEndX(null);
  };

  return (
    <div className="product-slider">
      <div className="product-slider__wrapper">
        <div className="product-slider__top">
          <h2 className="product-slider__title">{title}</h2>
          <div className="product-slider__btns">
            <button
              type="button"
              className={classNames('product-slider__prevBtn btn-arrows', {
                'btn-disabled': sliderTransformValue === 0,
              })}
              onClick={showPrevSlide}
            >
              <img src={arrowLeft} alt="icon" />
            </button>

            <button
              type="button"
              className={classNames('product-slider__nextBtn btn-arrows', {
                'btn-disabled':
                  sliderTransformValue > 0 &&
                  slideRef.current?.offsetWidth &&
                  sliderTransformValue ===
                    slideRef.current.offsetWidth * (products.length - 1),
              })}
              onClick={showNextSlide}
            >
              <img src={arrowRight} alt="icon" />
            </button>
          </div>
        </div>
        <div
          className="product-slider__slider"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          ref={slideRef}
        >
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
