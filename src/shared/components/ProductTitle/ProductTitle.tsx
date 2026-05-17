import React from 'react';
import styles from './ProductTitle.module.scss';
import { Link } from 'react-router-dom';

interface Props {
  name: string;
  to: string;
}

export const ProductTitle: React.FC<Props> = ({ name, to }) => (
  <h3 className={styles.name}>
    <Link className={styles.name__link} to={to}>
      {name}
    </Link>
  </h3>
);
