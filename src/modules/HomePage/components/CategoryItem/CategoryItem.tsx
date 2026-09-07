import React from 'react';
import styles from './CategoryItem.module.scss';
import { Category } from '../../../../types/Category';
import { useProducts } from '../../../../shared/context/ProductsContext';
import { Link } from 'react-router-dom';

type Props = {
  categoryItem: Category;
};

export const CategoryItem: React.FC<Props> = ({ categoryItem }) => {
  const { title, category, image } = categoryItem;
  const { products } = useProducts();

  const quantity = products?.filter(
    product => product.category === category,
  ).length;

  return (
    <div className={styles.category}>
      <div className={styles.category__container}>
        <div className={styles.category__image}>
          <Link to={`/${categoryItem.category}`}>
            <img src={image} alt={title.toLowerCase()} />
          </Link>
        </div>
        <Link to={`/${categoryItem.category}`}>
          <div className={styles.category__title}>{title}</div>
        </Link>
        <div className={styles.category__quantity}>{quantity} models</div>
      </div>
    </div>
  );
};
