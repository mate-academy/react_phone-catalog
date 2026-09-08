import React from 'react';
import styles from './Spec.module.scss';
import '../../styles/App.scss';

interface SpecProps {
  title: string;
  description: string;
}

const Spec: React.FC<SpecProps> = ({ title, description }) => {
  return (
    <div className={`${styles.product__info} `}>
      <span className={styles['product__info-title']}>{title}</span>
      <span className={styles['product__info-description']}>{description}</span>
    </div>
  );
};

export default Spec;
