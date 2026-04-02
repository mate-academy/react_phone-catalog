import { useRef, useState, useCallback } from 'react';
import { ProductCard } from '../ProductCard';
import type { Product } from '../../../types';
import './ProductSlider.scss';

const SCROLL_STEP = 288 + 16; // card width + gap

interface Props {
  title: string;
  products: Product[];
}

export const ProductSlider = ({ title, products }: Props) => {
  const listRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateArrows = useCallback(() => {
    const el = listRef.current;
    if (!el) {
      return;
    }
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  }, []);

  const scrollLeft = () => {
    listRef.current?.scrollBy({ left: -SCROLL_STEP, behavior: 'smooth' });
  };

  const scrollRight = () => {
    listRef.current?.scrollBy({ left: SCROLL_STEP, behavior: 'smooth' });
  };

  return (
    <section className="product-slider">
      <div className="product-slider__header">
        <h2 className="product-slider__title">{title}</h2>

        <div className="product-slider__arrows">
          <button
            className="product-slider__arrow"
            onClick={scrollLeft}
            disabled={!canScrollLeft}
            aria-label="Scroll left"
          >
            &#8249;
          </button>
          <button
            className="product-slider__arrow"
            onClick={scrollRight}
            disabled={!canScrollRight}
            aria-label="Scroll right"
          >
            &#8250;
          </button>
        </div>
      </div>

      <div
        className="product-slider__list"
        ref={listRef}
        onScroll={updateArrows}
      >
        {products.map((product) => (
          <div key={product.itemId} className="product-slider__item">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
};
