import React from "react";
import { Link } from "react-router-dom";

import { useAppSelector } from "../../../../../app/store/hooks";

import styles from './CategoryItem.module.scss';

type Props = {
  category: {
    category: string;
    img: string;
    label: string;
  };
};

export const CategoryItem: React.FC<Props> = ({ category }) => {
  const products = useAppSelector(state => state.product.items);

  const count = products.filter(product => product.category === category.category);

  return (
    <div className={styles.categoriesItem}>
      <div className={styles.categoriesBackground}>
        <Link to={category.category}>
          <img
            className={styles.categoriesImage}
            src={category.img}
            alt={category.label}
          />
        </Link>
      </div>
      <div className={styles.categoriesDescription}>
        <h3>{category.label}</h3>
        <p className={styles.categoriesCount}>{`${count.length} models`}</p>
      </div>
    </div>
  );
};
