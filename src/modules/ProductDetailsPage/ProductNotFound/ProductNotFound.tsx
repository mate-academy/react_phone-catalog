/* eslint-disable max-len */
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ProductNotFound.module.scss';
import productNotFoundImage from '../../../images/other_images/product-not-found.png';

export const ProductNotFound: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const REDIRECT_DELAY = 3000;

    const timeout = setTimeout(() => {
      navigate('..', { relative: 'path' });
    }, REDIRECT_DELAY);

    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <section className="container">
      <div className={styles.nfPage}>
        <h2 className={styles.nfPage_title}>Product Not Found</h2>
        <img
          src={productNotFoundImage}
          alt="Product not found illustration"
          className={styles.nfPage_img}
        />

        <p style={{ opacity: 0.5, marginTop: '10px' }}>
          You will be redirected in 3 seconds...
        </p>
      </div>
    </section>
  );
};
