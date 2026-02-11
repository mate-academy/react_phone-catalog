import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import image from '../../../assets/img/product-not-found.png';
import styles from './ProductNotFound.module.scss';

export const ProductNotFound: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => navigate('..'), 3000);

    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <section className={'container'}>
      <div className={styles.nfPage}>
        <h2 className={styles.nfPage_title}>Product Not Found</h2>
        <img src={image} alt="page not found" className={styles.nfPage_img} />
      </div>
    </section>
  );
};
