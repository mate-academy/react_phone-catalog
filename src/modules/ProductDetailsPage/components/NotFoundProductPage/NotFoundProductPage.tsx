import type React from 'react';
import { asset } from '../../../../helper';
import styles from './NotFoundProductPage.module.scss';
import { useNavigate } from 'react-router-dom';

export const NotFoundProductPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles['not-found-product-page']}>
      <button
        type="button"
        className={styles['back-link']}
        onClick={() => navigate(-1)}
      >
        <img src={asset('img/arrow-primary.svg')} alt="Back" />
        <span>Back</span>
      </button>
      <div className={styles.content}>
        <img
          src={asset('img/product-not-found.png')}
          alt="Product was not found"
        />
        <h4>Product was not found :(</h4>
      </div>
    </div>
  );
};
