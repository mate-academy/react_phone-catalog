import styles from './MySlider.module.scss';
import { ProductCard } from '../ProductCard';
import { Product } from '../../types/Product';
import { useEffect, useRef, useState } from 'react';

type Props = {
  title: string;
  products: Product[];
};

const GAP = 16;

export const MySlider = ({ title, products }: Props) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const slideRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [cardWidth, setCardWidth] = useState(0);

  const updateScrollButtons = () => {
    if (!trackRef.current) {
      return;
    }

    const { scrollLeft, scrollWidth, offsetWidth } = trackRef.current;

    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + offsetWidth < scrollWidth);
  };

  const scrollByCard = (direction: 'left' | 'right') => {
    if (trackRef.current) {
      trackRef.current.scrollBy({
        left: direction === 'right' ? cardWidth : -cardWidth,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    updateScrollButtons();

    const track = trackRef.current;

    if (!track) {
      return;
    }

    if (slideRef.current) {
      setCardWidth(slideRef.current.offsetWidth + GAP);
    }

    track.addEventListener('scroll', updateScrollButtons);
    window.addEventListener('resize', updateScrollButtons);

    return () => {
      track.removeEventListener('scroll', updateScrollButtons);
      window.removeEventListener('resize', updateScrollButtons);
    };
  }, [products.length]);

  return (
    <div className={styles.container}>
      <div className={styles.sectionTitleAndButtons}>
        <h2 className={styles.sectionTitle}>{title}</h2>
        <div className={styles.sliderButtons}>
          <button
            className={styles.customArrow}
            disabled={!canScrollLeft}
            onClick={() => scrollByCard('left')}
          >
            <img
              src={
                !canScrollLeft
                  ? `${import.meta.env.BASE_URL}/img/icons/arrow-left-disabled.svg`
                  : `${import.meta.env.BASE_URL}/img/icons/arrow-left.svg`
              }
            />
          </button>
          <button
            className={styles.customArrow}
            disabled={!canScrollRight}
            onClick={() => scrollByCard('right')}
          >
            <img
              src={
                !canScrollRight
                  ? `${import.meta.env.BASE_URL}/img/icons/arrow-right-disabled.svg`
                  : `${import.meta.env.BASE_URL}/img/icons/arrow-right.svg`
              }
            />
          </button>
        </div>
      </div>
      <div className={styles.sliderContainer}>
        <div className={styles.track} ref={trackRef}>
          {products.map((product, i) => (
            <div
              className={styles.slide}
              key={product.id}
              ref={i === 0 ? slideRef : null}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
