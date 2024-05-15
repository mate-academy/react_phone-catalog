import React, { useState } from 'react';
import './ProductSlider.scss';
import { Product } from '../../types/Product';
import { SliderSettings } from '../../types/SliderSettings';
import { ProductCard } from '../ProductCard';

type Props = {
  elements: Product[];
  settings: SliderSettings;
  title: string; // corrected to lowercase "string"
};

const ProductSlider: React.FC<Props> = ({ elements, settings, title }) => {
  const { itemWidth, gap, frameSize, step, animationDuration, infinite } =
    settings;
  const [position, setPosition] = useState(0);
  const lastPosition = -(elements.length - frameSize);
  const nextDisabled = position === lastPosition && !infinite;
  const prevDisabled = position === 0 && !infinite;

  const listStyles = {
    transform: `translateX(${position * (itemWidth + gap)}px)`,
    transition: `transform ${animationDuration}ms`,
  };

  const handlePrev = () => {
    const newPosition =
      position < 0 ? Math.min(position + step, 0) : lastPosition;

    setPosition(newPosition);
  };

  const handleNext = () => {
    const newPosition =
      position === lastPosition ? 0 : Math.max(position - step, lastPosition);

    setPosition(newPosition);
  };

  return (
    <div className="product-slider">
      <div className="product-slider__top">
        <h2 className="product-slider__title">{title}</h2>

        <div className="product-slider__buttons">
          <button
            className="product-slider__button"
            onClick={handlePrev}
            disabled={prevDisabled}
          >
            <i className="icon icon--arrow-left"></i>
          </button>
          <button
            className="product-slider__button"
            onClick={handleNext}
            disabled={nextDisabled}
          >
            <i className="icon icon--arrow-right"></i>
          </button>
        </div>
      </div>
      <div
        className="product-slider__carousel"
        style={{ width: `${(itemWidth + gap) * frameSize}px` }}
      >
        <ul className="product-slider__list" style={listStyles}>
          {elements.map(slide => (
            <li key={slide.id}>
              <ProductCard product={slide} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductSlider;
