import React from 'react';
import styles from './Breadcrumbs.module.scss';
import { Link } from 'react-router-dom';
import { ChevronArrowRight, Home } from '../../helpers/icons';

type Props = {
  category: string;
  productName?: string;
};

export const Breadcrumbs: React.FC<Props> = ({ category, productName }) => {
  return (
    <div className={styles.wrapper}>
      <Link to="/" className={styles.home}>
        <Home />
      </Link>

      <ChevronArrowRight />

      <Link to={`/${category}`} className={styles.category}>
        {category}
      </Link>

      {productName && (
        <>
          <ChevronArrowRight />
          <span className={styles.name}>{productName}</span>
        </>
      )}
    </div>
  );
};
