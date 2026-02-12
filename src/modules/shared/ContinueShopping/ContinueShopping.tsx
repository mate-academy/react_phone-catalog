import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ContinueShopping.module.scss';

export const ContinueShopping: React.FC = () => {
  return (
    <div className={`page__continue ${styles.continue}`}>
      <Link to={'/phones'} className={styles.continue__button}>
        Continue shopping
      </Link>
    </div>
  );
};
