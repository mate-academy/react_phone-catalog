import React, { useState } from 'react';
import styles from './ProductsSlider.module.scss';
import { ProductCard } from '../ProductCard';
import { Product } from '../../../types';

type Props = {
  title: string;
  products: Product[];
  itemsToShow?: number;
};

export const ProductsSlider: React.FC<Props> = ({
  title,
  products,
  itemsToShow = 4,
}) => {
  const [start, setStart] = useState(0);

  const canPrev = start > 0;
  const canNext = start < Math.max(products.length - itemsToShow, 0);

  const prev = () => canPrev && setStart(i => i - 1);
  const next = () => canNext && setStart(i => i + 1);

  const visible = products.slice(start, start + itemsToShow);

  const showOldPrice = title === 'Hot prices';

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>

        <div className={styles.controls}>
          <button
            className={styles.arrow}
            onClick={prev}
            disabled={!canPrev}
            aria-label="Previous"
          >
            &#10094;
          </button>
          <button
            className={styles.arrow}
            onClick={next}
            disabled={!canNext}
            aria-label="Next"
          >
            &#10095;
          </button>
        </div>
      </div>

      <div className="grid-24">
        {visible.map(p => (
          <div key={p.id} className="col-6">
            <ProductCard product={p} showOldPrice={showOldPrice} />
          </div>
        ))}
      </div>
    </section>
  );
};
