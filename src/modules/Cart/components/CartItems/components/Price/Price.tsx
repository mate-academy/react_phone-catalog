import React from 'react';

import styles from './Price.module.scss';

interface Props {
  price: number;
}

export const Price: React.FC<Props> = ({ price }) => (
  <div className={styles.price}>${price}</div>
);
