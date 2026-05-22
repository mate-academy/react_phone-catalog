import React, { useEffect, useRef } from 'react';
import productFromServer from '../../../../../public/api/products.json';
import styles from './productpromo.module.scss';
import { ProductCard } from '../productCard/producCard';

export const ProductPromo: React.FC = ({ currentIndex, suggestedProducts }) => {
  const listRef = useRef<HTMLUListElement>(null);
  const discount = true;

  /* eslint-disable @typescript-eslint/indent */
  const productYear = suggestedProducts
    ? suggestedProducts
    : [...productFromServer].sort((a, b) => {
        const sortYear = b.year - a.year;

        return sortYear !== 0 ? sortYear : b.price - a.price;
      });
  /* eslint-enable @typescript-eslint/indent */

  useEffect(() => {
    if (listRef.current) {
      const cardWidt = listRef.current.children[0]?.clientWidth || 0;

      const offset = currentIndex * (cardWidt + 16);

      listRef.current.style.transform = `translateX(-${offset}px)`;
    }
  }, [currentIndex]);

  return (
    <div className={styles['product__list-wrapper']}>
      <ul className={styles.product__list} ref={listRef}>
        {productYear.map(p => {
          return (
            <li className={styles['product__list-item']} key={p.id}>
              <ProductCard product={p} discount={discount} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};
