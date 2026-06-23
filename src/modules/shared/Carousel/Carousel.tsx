import { useEffect, useRef, useState } from 'react';
import { ProductCard } from '../ProductCard';
import styles from './Carousel.module.scss';

import SliderLeft from '../../../assets/Chevron (Arrow Left).svg?react';
import SliderRight from '../../../assets/Chevron (Arrow Right).svg?react';
import type { Product } from '../../../types/types';

interface Props {
  pageTitle: string;
  products: Product[];
  ShowDiscount?: boolean;
}

export const Carousel = ({ pageTitle, products, ShowDiscount = true }: Props) => {
  const trackref = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (!trackref.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = trackref.current;

    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
  };

  const scroll = (dir: 'left' | 'right') => {
    if (!trackref.current) return;

    const style = getComputedStyle(trackref.current);
    const screenWidth = window.innerWidth;
    const width = trackref.current.clientWidth + parseInt(style.getPropertyValue('--gap'));
    if (screenWidth > parseInt(style.getPropertyValue('--breakpoint-desktop'))) {
      trackref.current.scrollBy({
        left: dir === 'left' ? -width : width,
        behavior: 'smooth',
      });
    } else {
      trackref.current.scrollBy({
        left: dir === 'left' ? -(width * 0.4) : width * 0.4,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(checkScroll, 1000);

    const track = trackref.current;
    if (track) {
      track.addEventListener('scroll', checkScroll);
      window.addEventListener('resize', checkScroll);
    }

    return () => {
      clearTimeout(timeoutId);
      if (track) {
        track.removeEventListener('scroll', checkScroll);
      }
      window.removeEventListener('resize', checkScroll);
    };
  }, []);

  return (
    <div className={styles.carousel}>
      <div className={styles.carousel__heading}>
        <div className={styles.carousel__title}>{pageTitle}</div>
        <div className={styles.carousel__sliders}>
          <button
            className={`${styles.carousel__sliderBtn} ${!canScrollLeft ? styles.carousel__btnHidden : ''}`}
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
          >
            <SliderLeft />
          </button>
          <button
            className={`${styles.carousel__sliderBtn} ${!canScrollRight ? styles.carousel__btnHidden : ''}`}
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
          >
            <SliderRight />
          </button>
        </div>
      </div>

      <div className={styles.carousel__viewport}>
        <div className={styles.carousel__track} ref={trackref}>
          {products.map(product => (
            <div className={styles.carousel__item} key={product.id}>
              <ProductCard product={product} ShowDiscount={ShowDiscount} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
