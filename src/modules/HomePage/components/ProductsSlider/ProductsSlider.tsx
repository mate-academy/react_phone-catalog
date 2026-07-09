import { ProductCard } from '../../../../components/shared/ProductCard';
import { Product } from '../../../../types/Product';
import './ProductsSlider.scss';
import React from 'react';

type Props = {
  header: string;
  oldPrice: boolean;
  products: Product[];
};

export const ProductsSlider: React.FC<Props> = ({
  header,
  oldPrice,
  products,
}) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [visibleCards, setVisibleCards] = React.useState(4);
  const touchStart = React.useRef(0);
  const touchEnd = React.useRef(0);

  React.useEffect(() => {
    const updateVisibleCards = () => {
      const width = window.innerWidth;

      if (width < 640) {
        setVisibleCards(1);
      } else if (width < 1200) {
        setVisibleCards(2);
      } else {
        setVisibleCards(4);
      }
    };

    updateVisibleCards();
    window.addEventListener('resize', updateVisibleCards);

    return () => window.removeEventListener('resize', updateVisibleCards);
  }, []);
  const maxIndex = Math.max(0, products.length - visibleCards);

  React.useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [maxIndex, currentIndex]);
  const step = (offset: number) => {
    setCurrentIndex(prev => Math.max(0, Math.min(prev + offset, maxIndex)));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.targetTouches[0].clientX;
    touchEnd.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEnd.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStart.current - touchEnd.current;

    if (Math.abs(diff) > 50) {
      step(diff > 0 ? 1 : -1);
    }
  };

  return (
    <section className="products-slider">
      <div className="products-slider__container">
        <div className="products-slider__container--header">
          <h2 className="products-slider__title">{header}</h2>
          <div className="products-slider__container--buttons">
            <button
              className="products-slider__button products-slider__button--left"
              aria-label="Previous slide"
              onClick={() => step(-1)}
              disabled={currentIndex === 0}
            />
            <button
              className="products-slider__button products-slider__button--right"
              aria-label="Next slide"
              onClick={() => step(1)}
              disabled={currentIndex >= maxIndex}
            />
          </div>
        </div>
        <div
          className="products-slider__window"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="products-slider__cards"
            style={
              {
                '--current-index': currentIndex,
                '--visible-cards': visibleCards,
                display: 'flex',
              } as React.CSSProperties
            }
          >
            {products.map((product, index) => {
              return (
                <div key={index} className="products-slider__card-wrapper">
                  <ProductCard product={product} oldPrice={oldPrice} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
