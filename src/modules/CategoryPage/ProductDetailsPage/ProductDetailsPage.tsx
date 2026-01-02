import React from 'react';
import { Breadcrumbs } from '../../shared/Breadcrumbs';
import { Footer } from '../../shared/Footer';
import { Header } from '../../shared/Header';
import styles from './ProductDetailsPage.module.scss';
import { useNavigate, useParams } from 'react-router-dom';

export const ProductDetailsPage: React.FC = () => {
  const navigate = useNavigate();
  const { category, productId } = useParams<{
    category: string;
    productId: string;
  }>();

  return (
    <>
      <Header />
      <Breadcrumbs category={category || ''} productId={productId || 0} />
      <div className={styles.productdetailspage}>
        <button
          className={styles.productdetailspage__backbutton}
          onClick={() => navigate(-1)}
        >
          <img
            className={styles.productdetailspage__backbutton__icon}
            src="/public/img/icons/icon-chevron-arrow-left.png"
            alt=""
          />
          <p className={styles.productdetailspage__backbutton__text}>Back</p>
        </button>
      </div>
      <Footer />
    </>
  );
};
