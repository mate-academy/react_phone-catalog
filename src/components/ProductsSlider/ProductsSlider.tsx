import { useMemo, useState } from 'react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { Product } from '../../types';
import { ProductCard } from '../ProductCard';
import styles from './ProductsSlider.module.scss';

type Props = {
  title: string;
  products: Product[];
  showDiscount?: boolean;
  scrollOnCardClick?: boolean;
};

const PAGE_SIZE = 4;

export const ProductsSlider = ({
  title,
  products,
  showDiscount = true,
  scrollOnCardClick = false,
}: Props) => {
  const [start, setStart] = useState(0);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');

  const maxStart = Math.max(0, products.length - PAGE_SIZE);

  const visible = useMemo(
    () => products.slice(start, start + PAGE_SIZE),
    [products, start],
  );

  let transitionClassNames = {
    enter: styles.slidePrevEnter,
    enterActive: styles.slidePrevEnterActive,
    exit: styles.slidePrevExit,
    exitActive: styles.slidePrevExitActive,
  };

  if (direction === 'next') {
    transitionClassNames = {
      enter: styles.slideNextEnter,
      enterActive: styles.slideNextEnterActive,
      exit: styles.slideNextExit,
      exitActive: styles.slideNextExitActive,
    };
  }

  return (
    <section className={styles.section}>
      <div className={styles.head}>
        <h2>{title}</h2>
        <div className={styles.controls}>
          <button
            type="button"
            onClick={() => {
              setDirection('prev');
              setStart(value => Math.max(0, value - 1));
            }}
            disabled={start === 0}
          >
            {'<'}
          </button>
          <button
            type="button"
            onClick={() => {
              setDirection('next');
              setStart(value => Math.min(maxStart, value + 1));
            }}
            disabled={start >= maxStart}
          >
            {'>'}
          </button>
        </div>
      </div>

      <div className={styles.viewport}>
        <SwitchTransition mode="out-in">
          <CSSTransition
            key={start}
            timeout={300}
            classNames={transitionClassNames}
            unmountOnExit
          >
            <div className={styles.grid}>
              {visible.map(product => (
                <ProductCard
                  key={product.itemId}
                  product={product}
                  showDiscount={showDiscount}
                  scrollToTopOnClick={scrollOnCardClick}
                />
              ))}
            </div>
          </CSSTransition>
        </SwitchTransition>
      </div>
    </section>
  );
};
