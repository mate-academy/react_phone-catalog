import React from 'react';
import styles from './ProductInfoPage.module.scss';
import { Icon } from '../../components/Icon';
import { useParams } from 'react-router-dom';
import { useAllProducts } from '../../hooks/useAllProducts';
import { ProductAddInfo } from './components/ProductAddInfo';
import { AboutProduct } from './components/AboutProduct';
import { Gallery } from './components/Gallery';

export const ProductInfoPage = () => {
  const { allProducts } = useAllProducts();
  const { productId } = useParams();
  const selectedProduct = allProducts.find(
    allProduct => allProduct.id === productId,
  );

  return (
    <div className={styles.product}>
      <div className={styles.product__breadcrumbs}>lalala</div>

      <button className={styles.product__back}>
        <div className={styles.product__icon}>
          <Icon type="arrowPrev" isSmall />
        </div>

        <span className={styles.product__btnText}>Back</span>
      </button>

      {selectedProduct && (
        <>
          <h2 className={styles.product__name}>{selectedProduct.name}</h2>

          <div className={styles.product__details}>
            <div className={styles.product__images}>
              <Gallery selectedProduct={selectedProduct} />
            </div>

            <div className={styles.product__addInfo}>
              <ProductAddInfo selectedProduct={selectedProduct} />
            </div>

            <div className={styles.product__aboutInfo}>
              <AboutProduct selectedProduct={selectedProduct} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};
