import React from 'react';
import styles from './ProductImg.module.scss';
import { Link } from 'react-router-dom';

interface Props {
  image: string;
  name: string;
  to: string;
}

export const ProductImg: React.FC<Props> = ({ image, name, to }) => (
  <Link className={styles.image} to={to}>
    <img src={image} alt={name} loading="lazy" />
  </Link>
);
