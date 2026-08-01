import React from 'react';
import styles from './CategoryItem.module.scss';
import { Link } from 'react-router-dom';
import { useAppContext } from '../../../../../../hooks/useAppContext';
// eslint-disable-next-line max-len
import { countItemsByCategory } from '../../../../../ProductsPage/utilis/sortedProducts';
import { Category } from '../../../../../../types/productTypes';

type CategoryItemProps = {
  imgSrc: string;
  label: string;
  category: string;
  alt: string;
  to: string;
};

export const CategoryItem = ({
  imgSrc,
  label,
  category,
  alt,
  to,
}: CategoryItemProps) => {
  const {
    state: { products },
  } = useAppContext();

  const { length } = countItemsByCategory(category as Category, products);

  return (
    <Link to={to} className={styles.linkWrapper}>
      <article className={styles.category}>
        <div className={styles.category__item}>
          <img className={styles.category__img} src={imgSrc} alt={alt} />
        </div>
        <h3 className={styles.category__title}>{label}</h3>
        <p className={styles.category__value}>{`${length} models`}</p>
      </article>
    </Link>
  );
};
