import React from 'react';
// import { Link } from 'react-router-dom';
import styles from './ProductSlider.module.scss';
import { ProductCard } from '../ProductCard';
import { ChevronArrowLeft, ChevronArrowRight } from '../../helpers/icons';
import { Product } from '../../typies';

type Props = {
  title: string;
  products: Product[] | null;
};

const STEP = 1;
const FRAME_SIZE = 1;
const ITEM_WIDTH = 272 + 16; // 272 - width of card, 16 - gap
const ITEMS_COUNT_PER_SLIDE = 4;

export const ProductsSlider: React.FC<Props> = ({ title, products }) => {
  const [slide, setSlide] = React.useState(0);

  const startSlide = React.useMemo(
    () =>
      products?.length
        ? products?.length - FRAME_SIZE * ITEMS_COUNT_PER_SLIDE
        : 0,
    [products?.length],
  );

  const listStyle = React.useMemo(
    () => ({
      transform: `translateX(-${slide * ITEM_WIDTH}px)`,
    }),
    [slide],
  );

  const isNext = slide === startSlide;
  const isPrevious = slide === 0;

  const handleNextSlideClick = () => {
    setSlide(currentSlide => {
      if (currentSlide !== startSlide) {
        return Math.min(currentSlide + STEP, startSlide);
      }

      return 0;
    });
  };

  const handlePreviousSlideClick = () => {
    setSlide(currentSlide => {
      if (slide > 0) {
        return Math.max(currentSlide - STEP, 0);
      }

      return startSlide;
    });
  };

  return (
    <section className={styles.container}>
      <div className={styles.top}>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.button_wrapper}>
          <button
            type="button"
            className={styles.button}
            disabled={isPrevious}
            onClick={handlePreviousSlideClick}
          >
            <ChevronArrowLeft />
          </button>
          <button
            type="button"
            className={styles.button}
            disabled={isNext}
            onClick={handleNextSlideClick}
          >
            <ChevronArrowRight />
          </button>
        </div>
      </div>
      <div className={styles.cards_wrapper}>
        <ul className={styles.list} style={listStyle}>
          {products &&
            products?.map(product => (
              <li key={product.id} className={styles.item}>
                <ProductCard product={product} type={title} />
              </li>
            ))}
        </ul>
      </div>
    </section>
  );
};
