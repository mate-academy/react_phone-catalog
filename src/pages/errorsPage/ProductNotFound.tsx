import { FC } from 'react';

import ErrorImage from '/img/error/product-not-found.png';

import styles from './errorsPage.module.scss';

export const ProductNotFound: FC = () => (
  <div className={styles.image}>
    <img src={ErrorImage} alt="Product not found" />
  </div>
);
