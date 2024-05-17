import React, { useEffect, useState } from 'react';
import './ProductSlider.scss';
import { Product } from '../../types/Product';
import { SliderSettings } from '../../types/SliderSettings';
import { ProductCard } from '../ProductCard';

type Props = {
  elements: Product[];
  settings: SliderSettings;
  title: string;
  isDiscount?: boolean;
};

const ProductSlider: React.FC<Props> = ({
  elements,
  settings,
  title,
  isDiscount,
}) => {
  const {
    itemWidth,
    gap,
    frameSize,
    step = 1,
    animationDuration = 1000,
    autoplay = false,
    infinite = false,
  } = settings;
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

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (autoplay) {
      intervalId = setInterval(() => {
        handleNext();
      }, 3000);
    }

    return () => {
      clearInterval(intervalId);
    };
  });

  return (
    <div className="product-slider">
      <div className="product-slider__top">
        {title && <h2 className="product-slider__title">{title}</h2>}

        <div className="product-slider__buttons">
          <button
            className="product-slider__button"
            onClick={handlePrev}
            disabled={prevDisabled}
          >
            <i className={`icon icon--arrow-left`}></i>
          </button>
          <button
            className="product-slider__button"
            onClick={handleNext}
            disabled={nextDisabled}
          >
            <i className="icon icon__arrow-right"></i>
          </button>
        </div>
      </div>
      <div
        className="product-slider__carousel"
        style={{ width: `${(itemWidth + gap) * frameSize}px` }}
      >
        <ul className="product-slider__list" style={listStyles}>
          {elements.map(element => (
            <li key={element.id}>
              <ProductCard product={element} discount={isDiscount} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductSlider;
