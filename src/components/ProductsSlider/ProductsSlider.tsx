import React from 'react';
import styles from './ProductSlider.module.scss';
import { ProductCard } from '../../components';
import { ChevronArrowLeft, ChevronArrowRight } from '../../helpers/icons';
import { Product } from '../../typies';

const BRAND_NEW = 'Brand new models';
const MAY_ALSO_LIKE = 'You may also like';

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
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.buttonWrapper}>
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
      <div className={styles.cardsWrapper}>
        <ul className={styles.list} style={listStyle}>
          {products &&
            products?.map(product => (
              <li key={product.id} className={styles.item}>
                <ProductCard
                  product={product}
                  discount={title !== BRAND_NEW}
                  productDetail={title === MAY_ALSO_LIKE}
                />
              </li>
            ))}
        </ul>
      </div>
    </section>
  );
};
