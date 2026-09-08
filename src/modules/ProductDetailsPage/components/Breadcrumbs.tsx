import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Breadcrumbs.module.scss';

type Props = {
  category: string;
  productName: string;
};

export const Breadcrumbs: React.FC<Props> = ({ category, productName }) => (
  <nav className={styles.breadcrumbs}>
    <Link to="/">Home</Link> /
    <Link to={`/${category}`}>
      {category.charAt(0).toUpperCase() + category.slice(1)}
    </Link>
    / <span>{productName}</span>
  </nav>
);
