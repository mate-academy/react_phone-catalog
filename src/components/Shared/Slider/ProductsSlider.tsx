import React, { useState } from 'react';
import { ProductCard } from '../Product/ProductCard';
import { Product } from '../../../types/Product';

type Props = {
  newProducts: Product[];
  title?: string;
  hasDiscount?: boolean;
};

export const ProductsSlider: React.FC<Props> = ({
  newProducts,
  title,
  hasDiscount = true,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const VISIBLE_CARDS = 4;
  const CARD_WIDTH = 272;
  const GAP = 16;

  const maxIndex = Math.max(0, newProducts.length - VISIBLE_CARDS);

  const handleNext = () => {
    if (currentIndex < maxIndex) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const offset = currentIndex * (CARD_WIDTH + GAP);

  return (
    <section className="new-model" id="new-model">
      <div className="new-model__top">
        <h2 className="new-model__title">{title}</h2>

        <div className="new-model__buttons">
          <button
            type="button"
            className="new-model__btn new-model__btn--prev"
            onClick={handlePrev}
            disabled={currentIndex === 0}
            aria-label="Previous products"
          >
            &lt;
          </button>
          <button
            type="button"
            className="new-model__btn new-model__btn--next"
            onClick={handleNext}
            disabled={currentIndex >= maxIndex}
            aria-label="Next products"
          >
            &gt;
          </button>
        </div>
      </div>

      <div className="new-model__product-cards">
        <div
          className="new-model__cards-track"
          style={{ transform: `translateX(-${offset}px)` }}
        >
          {newProducts.map(product => (
            <div className="new-model__card-wrapper" key={product.id}>
              <ProductCard product={product} hasDiscount={hasDiscount} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
