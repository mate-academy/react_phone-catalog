import React from 'react';
import styles from './Category.module.scss';
import { Link } from 'react-router-dom';

type Props = {
  category: {
    id: string;
    title: string;
    path: string;
    amount: number;
  };
};
const Category: React.FC<Props> = ({ category }) => {
  return (
    <div className={styles.category} title={`Go to ${category.title}`}>
      <Link
        to={category.id}
        className={
          styles.category__img + ' ' + styles[`category__img_${category.id}`]
        }
      >
        <img src={category.path} alt="category phones" />
      </Link>
      <h3 className={styles.category__title}>{category.title}</h3>
      <p className={styles.category__amount}>{category.amount} models</p>
    </div>
  );
};

export default Category;
