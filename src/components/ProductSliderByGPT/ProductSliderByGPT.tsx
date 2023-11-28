import React, { useRef, useState } from 'react';
import './productSliderByGPT.scss';
import { Phones } from '../../types/Phones';
import { ProductCard } from '../ProductCard';

type Props = {
  productCards: Phones[],
};

export const ProductSliderByGPT: React.FC<Props> = ({ productCards }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = (direction: 'left' | 'right') => {
    const cardWidth = 300; // Adjust this based on your product card width
    const container = containerRef.current;

    if (!container) {
      return;
    }

    const maxScroll = container.scrollWidth - container.clientWidth;
    const newScrollPosition
      = direction === 'left'
        ? Math.max(0, scrollPosition - cardWidth)
        : Math.min(maxScroll, scrollPosition + cardWidth);

    setScrollPosition(newScrollPosition);
  };

  const isLeftButtonDisabled = () => scrollPosition === 0;
  const isRightButtonDisabled = () => {
    const container = containerRef.current;

    return !container || scrollPosition
      >= container.scrollWidth - container.clientWidth - 1;
  };

  return (
    <div className="slider-wrapper">
      <div
        ref={containerRef}
        id="slider-container"
        className="slider-container"
        style={{ transform: `translateX(-${scrollPosition}px)` }}
      >
        {productCards.map((product) => (
          <ProductCard
            key={product.id}
            productData={product}
            // priceToken={product.price}
          />
        ))}
      </div>
      <button
        type="button"
        className="slider-arrow left"
        onClick={() => handleScroll('left')}
        disabled={isLeftButtonDisabled()}
      >
        {'<'}
      </button>
      <button
        type="button"
        className="slider-arrow right"
        onClick={() => handleScroll('right')}
        disabled={isRightButtonDisabled()}
      >
        {'>'}
      </button>
    </div>
  );
};
