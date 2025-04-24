import React from 'react';
import styles from './PriceBig.module.scss';
import '../../styles/App.scss';

interface PriceBigProps {
  children: React.ReactNode;
}

const PriceBig: React.FC<PriceBigProps> = ({ children }) => {
  return <h2 className={styles['price-big']}>{children}</h2>;
};

export default PriceBig;
