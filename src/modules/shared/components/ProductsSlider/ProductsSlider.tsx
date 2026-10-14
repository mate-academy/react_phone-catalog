import { useEffect, useRef, useState } from 'react';
import { Product } from '../../../../types/product';
import { ProductCard } from '../ProductCard';
import styles from './ProductsSlider.module.scss';

type Props = {
  products: Product[];
  title: string;
};

const getVisibleCards = () => {
  if (window.innerWidth >= 1200) {
    return 4;
  }

  if (window.innerWidth >= 640) {
    return 3;
  }

  return 1;
};

const getCardWidth = () => {
  if (window.innerWidth >= 1200) {
    return 275;
  }

  if (window.innerWidth >= 640) {
    return 247;
  }

  return 288;
};

export const ProductsSlider: React.FC<Props> = ({ products, title }) => {
  const [slideIndex, setSlideIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [visibleCards, setVisibleCards] = useState(getVisibleCards());

  useEffect(() => {
    const handleResize = () => {
      setVisibleCards(getVisibleCards());
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const CARD_WIDTH = getCardWidth();
  const GAP = 16;

  const step = CARD_WIDTH + GAP;
  const maxIndex = Math.max(0, products.length - visibleCards);

  const changeSlide = (direction: number) => {
    setSlideIndex(prevIndex => {
      const nextIndex = prevIndex + direction;

      if (nextIndex < 0) {
        return 0;
      }

      if (nextIndex > maxIndex) {
        return maxIndex;
      }

      return nextIndex;
    });
  };

  return (
    <>
      <div className={styles.section__wrapper}>
        <h2 className={styles.section__title}>{title}</h2>

        <div className={styles.section__buttons}>
          <button
            type="button"
            className={styles.section__leftbtn}
            onClick={() => changeSlide(-1)}
            disabled={slideIndex === 0}
            aria-label="Previous slide"
          >
            <span className={styles.section__leftbtn_icon}></span>
          </button>
          <button
            type="button"
            className={styles.section__rightbtn}
            onClick={() => changeSlide(1)}
            disabled={slideIndex === maxIndex}
            aria-label="Next slide"
          >
            <span className={styles.section__rightbtn_icon}></span>
          </button>
        </div>
      </div>

      <div className={styles.slider}>
        <div
          ref={trackRef}
          className={styles.slider__track}
          style={{
            transform: `translateX(-${slideIndex * step}px)`,
          }}
        >
          {products.map(product => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      </div>
    </>
  );
};
