import './RecommendedSlider.scss';

import React, { useState } from 'react';
import classNames from 'classnames';
import { ProductCard } from '../ProductCard/ProductCard';
import { Product } from '../Types/products';

type RecommendedSliderProps = {
  title: string;
  recommendedProducts: Product[];
};

export const RecommendedSlider: React.FC<RecommendedSliderProps> = ({
  title,
  recommendedProducts,
}) => {
  const [scroll, setScroll] = useState(0);

  const getSliderSettings = () => {
    const width = window.innerWidth;

    if (width > 320 && width < 640) {
      return { step: 228, visibleCards: 1 };
    } else if (width > 640 && width < 1200) {
      return { step: 253, visibleCards: 2 };
    } else {
      return { step: 288, visibleCards: 4 };
    }
  };

  const { step, visibleCards } = getSliderSettings();

  const scrollRight = () => {
    const maxScroll = recommendedProducts.length - visibleCards;

    setScroll(prev => Math.min(prev + 1, maxScroll));
  };

  const scrollLeft = () => {
    setScroll(prev => Math.max(prev - 1, 0));
  };

  return (
    <div className="recommended-slider">
      <div className="recommended-slider__recommend-bar">
        <h2 className="recommended-slider__recommend-bar-title">{title}</h2>
        <div className="recommended-slider__recommend-bar-buttons">
          <button
            className={classNames('recommended-slider__recommend-bar-button', {
              'recommended-slider__recommend-bar-button--active': scroll !== 0,
            })}
            onClick={scrollLeft}
          >
            <img src="./img/logos/left-arrow-logo.png" alt="Previous" />
          </button>
          <button
            className={classNames('recommended-slider__recommend-bar-button', {
              'recommended-slider__recommend-bar-button--active':
                scroll !== recommendedProducts.length - visibleCards,
            })}
            onClick={scrollRight}
          >
            <img src="./img/logos/right-arrow-logo.png" alt="Next" />
          </button>
        </div>
      </div>

      <div className="recommended-slider__recommended-products">
        <div
          className="recommended-slider__slides"
          style={{
            transform: `translateX(-${scroll * step}px)`,
            width: `${step * recommendedProducts.length}px`,
          }}
        >
          {recommendedProducts.map(recommended => (
            <div className="recommended-slider__slide" key={recommended.id}>
              <ProductCard product={recommended} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
