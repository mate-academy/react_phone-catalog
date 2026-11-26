import { useRef, useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';
import { ProductCard } from '../ProductCard';
import { IconChevronLeft, IconChevronRight } from '../Icons';
import { Button } from '../Button';
import type { Product } from '../../types/Product';
import styles from './ProductsSlider.module.scss';

interface ProductsSliderProps {
  title: string;
  products: Product[];
}

export function ProductsSlider({
  title,
  products,
}: ProductsSliderProps): JSX.Element | null {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const checkScroll = useCallback(() => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;

      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 1);
    }
  }, []);

  const scrollLeft = useCallback(() => {
    if (sliderRef.current) {
      const cardWidth = 272 + 16; // card width + gap

      sliderRef.current.scrollBy({ left: -cardWidth * 2, behavior: 'smooth' });
    }
  }, []);

  const scrollRight = useCallback(() => {
    if (sliderRef.current) {
      const cardWidth = 272 + 16; // card width + gap

      sliderRef.current.scrollBy({ left: cardWidth * 2, behavior: 'smooth' });
    }
  }, []);

  useEffect(() => {
    checkScroll();
    const slider = sliderRef.current;

    if (slider) {
      slider.addEventListener('scroll', checkScroll, { passive: true });
    }

    return () => {
      if (slider) {
        slider.removeEventListener('scroll', checkScroll);
      }
    };
  }, [checkScroll, products.length]);

  if (products.length === 0) {
    return null;
  }

  return (
    <section
      className={styles.slider}
      aria-labelledby={title.toLowerCase().replace(/\s+/g, '-')}
    >
      <div className={styles.header}>
        <h2
          id={title.toLowerCase().replace(/\s+/g, '-')}
          className={styles.title}
        >
          {title}
        </h2>
        <div className={styles.controls}>
          <Button
            variant="slider"
            className={classNames(styles.arrowButton, styles.leftArrow)}
            onClick={scrollLeft}
            disabled={!showLeftArrow}
            aria-label="Scroll left"
          >
            <IconChevronLeft />
          </Button>
          <Button
            variant="slider"
            className={classNames(styles.arrowButton, styles.rightArrow)}
            onClick={scrollRight}
            disabled={!showRightArrow}
            aria-label="Scroll right"
          >
            <IconChevronRight />
          </Button>
        </div>
      </div>
      <div ref={sliderRef} className={styles.track} role="list">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
