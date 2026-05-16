import React from 'react';
import styles from './Price.module.scss';
import '../../styles/App.scss';

interface PriceProps {
  children: React.ReactNode;
}

const Price: React.FC<PriceProps> = ({ children }) => {
  return <h3 className={styles.price}>{children}</h3>;
};

export default Price;
