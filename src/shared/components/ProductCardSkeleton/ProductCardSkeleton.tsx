import React from 'react';

import styles from './ProductCardSkeleton.module.scss';

export const ProductCardSkeleton: React.FC = () => {
  return <div className={styles.card}></div>;
};
