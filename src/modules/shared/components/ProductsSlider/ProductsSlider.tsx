/* eslint no-console: [,{ allow: ["warn", "log", "error"] }] */
import { FC, useEffect, useRef, useState } from 'react';
import { Product } from '../../../../types/Product';
import { ProductCard } from '../ProductCard';
import next from '../../../../assets/images/icons/arrow-right.svg';
import prev from '../../../../assets/images/icons/arrow-left.svg';

import s from './ProductsSlider.module.scss';

interface Props {
  products: Product[];
  title: string;
  priceMode?: 'discount' | 'full';
}
export const ProductsSlider: FC<Props> = ({
  products,
  title,
  priceMode = 'full',
}) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  const scrollNextPrev = (dir: -1 | 1) => {
    const div = sliderRef.current;

    if (!div) {
      return;
    }

    const step = Math.min(div.clientWidth * 0.9, 850);

    div.scrollBy({ left: step * dir, behavior: 'smooth' });
  };

  const updateNavButtons = () => {
    const div = sliderRef.current;

    if (!div) {
      return;
    }

    const { scrollLeft, scrollWidth, clientWidth } = div;

    setIsAtStart(scrollLeft <= 0);
    setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - 1);
  };

  useEffect(() => {
    const div = sliderRef.current;

    if (!div) {
      return;
    }

    updateNavButtons();
    div.addEventListener('scroll', updateNavButtons);
    window.addEventListener('resize', updateNavButtons);

    return () => {
      div.removeEventListener('scroll', updateNavButtons);
      window.removeEventListener('resize', updateNavButtons);
    };
  }, []);

  return (
    <div className={s.productSlider}>
      <div className={s.sliderHeader}>
        <h2>{title}</h2>
        <div className={s.sliderNavButtons}>
          <button
            className={s.sliderNavButton}
            aria-label="Previous slide"
            onClick={() => scrollNextPrev(-1)}
            disabled={isAtStart}
          >
            <img src={prev} alt="Previous" />
          </button>
          <button
            className={s.sliderNavButton}
            aria-label="Next slide"
            onClick={() => scrollNextPrev(1)}
            disabled={isAtEnd}
          >
            <img src={next} alt="Next" />
          </button>
        </div>
      </div>

      <div ref={sliderRef} className={s.sliderContent}>
        <div className={s.sliderRow}>
          {products.map(product => (
            <div key={product.id}>
              <ProductCard product={product} priceMode={priceMode} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
