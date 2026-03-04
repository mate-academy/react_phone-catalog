import { FC, useRef, useState } from 'react';
import styles from './ProductSection.module.scss';
import products from './../../../../../public/api/products.json';
import { ProductSlider } from '../ProductSlider';
import classNames from 'classnames';
import './../../../../styles/global.scss';
import arrowRight from './../../../../../public/img/icons/arrowRightWhite.svg';
import arrowLeft from './../../../../../public/img/icons/arrowLeftWhite.svg';

type Props = {
  title: string;
  type: 'hot' | 'new';
};

export const ProductSection: FC<Props> = ({ title, type }) => {
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  const [currentElIndex, seCurrentElIndex] = useState<number>(0);

  const sortedProducts = [...products].sort((a, b) => {
    if (type === 'new') {
      return b.year - a.year;
    }

    if (type === 'hot') {
      const discountA = a.fullPrice - a.price;
      const discountB = b.fullPrice - b.price;

      return discountB - discountA;
    }

    return 0;
  });

  return (
    <section className={styles.product}>
      <div className={styles.product__header}>
        <h2 className="h2title">{title}</h2>

        <div className={styles.nav__buttons}>
          <button
            ref={prevRef}
            className={classNames(styles.prev, {
              [styles.disabled]: currentElIndex === 0,
            })}
            aria-label="Prev"
          >
            <img src={arrowLeft} alt="arrowLeft" />
          </button>
          <button
            ref={nextRef}
            className={classNames(styles.next, {
              [styles.disabled]: currentElIndex === products.length - 4,
            })}
            aria-label="Next"
          >
            <img src={arrowRight} alt="arrowRight" />
          </button>
        </div>
      </div>
      <ProductSlider
        products={sortedProducts}
        seCurrentElIndex={seCurrentElIndex}
        prevRef={prevRef}
        nextRef={nextRef}
        type={type}
      />
    </section>
  );
};
