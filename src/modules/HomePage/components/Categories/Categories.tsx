import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { categoryItems } from '../../constants';
import { Category, Product } from '../../../../types';

import styles from './Categories.module.scss';

type Props = {
  className?: string;
  isLoading: boolean;
  products: Product[];
};

export const Categories: React.FC<Props> = ({
  className = '',
  products,
  isLoading,
}) => {
  const countsByCategory = useMemo(() => {
    return products.reduce(
      (acc, product) => {
        return {
          ...acc,
          [product.category]: (acc[product.category] || 0) + 1,
        };
      },
      {} as Record<Category, number>,
    );
  }, [products]);

  return (
    <section className={classNames(styles['shop-by-category'], className)}>
      <h2 className={styles['shop-by-category__title']}>Shop by category</h2>

      <div className={styles['shop-by-category__categories']}>
        {categoryItems.map((item, index) => (
          <article key={item.img + index} className={styles.category}>
            <Link
              to={item.navigateTo}
              className={styles.category__link}
              style={{ background: item.background }}
            >
              <img
                src={item.img}
                alt={item.alt}
                className={styles.category__img}
              />
            </Link>

            <h4 className={styles.category__title}>{item.title}</h4>

            <p
              className={classNames(styles.category__models, {
                [styles['category__models--loading']]: isLoading,
              })}
            >
              {isLoading
                ? ''
                : `${countsByCategory[item.category] || 0} models`}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
};
