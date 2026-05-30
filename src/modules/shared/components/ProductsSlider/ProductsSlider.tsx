import React from 'react';
import { useRef } from 'react';
import { Product } from '../../../../types';
import { ProductCard } from '../ProductCard';
import styles from './ProductsSlider.module.scss';

interface Props {
  title: string;
  products: Product[];
}

export const ProductsSlider: React.FC<Props> = ({ title, products }) => {
  const listRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    if (!listRef.current) {
      return;
    }

    const scrollAmount = 288;

    listRef.current.scrollBy({
      left: dir === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.controls}>
          <button
            className={styles.btn}
            onClick={() => scroll('left')}
            aria-label="Scroll left"
          >
            <i className="fa-solid fa-chevron-left" />
          </button>
          <button
            className={styles.btn}
            onClick={() => scroll('right')}
            aria-label="Scroll right"
          >
            <i className="fa-solid fa-chevron-right" />
          </button>
        </div>
      </div>

      <div className={styles.listWrapper} ref={listRef}>
        <div className={styles.list}>
          {products.map(product => (
            <div key={product.id} className={styles.item}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
