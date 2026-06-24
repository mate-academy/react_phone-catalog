import { useState } from 'react';
import styles from './ProductsSlider.module.scss';

import arrow_black from '/img/arrow-black.svg';
import arrow_grey from '/img/arrow-grey.svg';
import classNames from 'classnames';
import { ProductCard } from '../../../../components/ProductCard';
import { Product } from '../../../../types/Product';
import { ITEM_HEIGHT, ITEM_WIDTH } from '../../../../config';
import { Loader } from '../../../../components/Loader/Loader';

const countOfImgInFrame = 4;
const animationDuration = 400;
const gap = 16;
const step = 1;

type Props = {
  products: Product[];
  title: string;
  isDiscountVisible?: boolean;
  loading: boolean;
};

export const ProductsSlider: React.FC<Props> = ({
  title,
  isDiscountVisible,
  products,
  loading,
}) => {
  const frameWidth = (ITEM_WIDTH + gap) * countOfImgInFrame - gap;
  const listWidth = (ITEM_WIDTH + gap) * products.length - gap;
  const maxTranslateValue = -(listWidth - frameWidth);

  const getStepWidth = (stepValue: number): number => {
    return (ITEM_WIDTH + gap) * stepValue;
  };

  const [translateValue, setTranslateValue] = useState(0);
  const [shifting, setShifting] = useState(false);

  const handleListShiftLeft = () => {
    setShifting(true);

    setTranslateValue(
      translateValue + getStepWidth(step) <= 0
        ? translateValue + getStepWidth(step)
        : 0,
    );
  };

  const handleListShiftRight = () => {
    setShifting(true);

    setTranslateValue(
      translateValue - getStepWidth(step) - gap < maxTranslateValue
        ? maxTranslateValue
        : translateValue - getStepWidth(step),
    );
  };

  return (
    <section className={styles.products_slider}>
      <div className={styles.top_box}>
        <h2>{title}</h2>

        <div className={styles.buttons}>
          <button
            type="button"
            disabled={shifting || translateValue === 0}
            onClick={handleListShiftLeft}
            className={classNames({
              [styles.button_disabled]: translateValue === 0,
            })}
          >
            <img
              src={translateValue === 0 ? arrow_grey : arrow_black}
              alt="arrow"
              className={styles.arrow_left}
            />
          </button>

          <button
            type="button"
            disabled={shifting || translateValue === maxTranslateValue}
            onClick={handleListShiftRight}
            className={classNames({
              [styles.button_disabled]: translateValue === maxTranslateValue,
            })}
          >
            <img
              src={
                translateValue === maxTranslateValue ? arrow_grey : arrow_black
              }
              alt="arrow"
              className={styles.arrow_right}
            />
          </button>
        </div>
      </div>

      {products.length > 0 ? (
        <div
          className={styles.frame}
          style={{
            width: `${frameWidth}px`,
            height: `${ITEM_HEIGHT}px`,
          }}
        >
          <ul
            className={styles.list}
            style={{
              gap: `${gap}px`,
              transform: `translateX(${translateValue}px)`,
              transition: `transform ${animationDuration}ms ease-in-out`,
              height: `${ITEM_HEIGHT}px`,
            }}
            onTransitionEnd={() => setShifting(false)}
          >
            {products.map(product => (
              <li key={product.id}>
                <ProductCard
                  product={product}
                  itemHeight={ITEM_HEIGHT}
                  itemWidth={ITEM_WIDTH}
                  isDiscountVisible={isDiscountVisible}
                />
              </li>
            ))}
          </ul>
        </div>
      ) : loading ? (
        <Loader />
      ) : (
        <p className={styles.list_empty_title}>
          The product list is empty {'(('}
        </p>
      )}
    </section>
  );
};
