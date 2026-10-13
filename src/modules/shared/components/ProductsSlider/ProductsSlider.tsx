import { useRef, useState } from 'react';
import { Product } from '../../../../types/product';
import { ProductCard } from '../ProductCard';
import styles from './ProductsSlider.module.scss';

type Props = {
  products: Product[];
  title: string;
};

export const ProductsSlider: React.FC<Props> = ({ products, title }) => {
  const [slideIndex, setSlideIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const CARD_WIDTH = 212;
  const GAP = 16;

  const step = CARD_WIDTH + GAP;

  const changeSlide = (direction: number) => {
    setSlideIndex(prevIndex => {
      const nextIndex = prevIndex + direction;

      if (nextIndex < 0) {
        return 0;
      }

      if (nextIndex > products.length - 1) {
        return products.length - 1;
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
            disabled={slideIndex === products.length - 1}
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
