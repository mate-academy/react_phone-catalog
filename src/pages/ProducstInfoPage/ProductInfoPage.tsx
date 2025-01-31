import React, { useEffect, useState } from 'react';
import styles from './ProductInfoPage.module.scss';
import { Icon } from '../../components/Icon';
import { useParams } from 'react-router-dom';
import { useAllProducts } from '../../hooks/useAllProducts';
import classNames from 'classnames';
import { ProductAddInfo } from './components/ProductAddInfo';

export const ProductInfoPage = () => {
  const { allProducts } = useAllProducts();
  const { productId } = useParams();
  const selectedProduct = allProducts.find(
    allProduct => allProduct.id === productId,
  );

  const [activeImg, setActiveImg] = useState<string | null>(null);

  useEffect(() => {
    if (selectedProduct && selectedProduct.images.length > 0) {
      setActiveImg(selectedProduct.images[0]);
    }
  }, [selectedProduct]);

  const handleImgClick = (image: string) => {
    setActiveImg(image);
  };

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

          <div className={styles.product__mainInfo}>
            <div className={styles.product__photosWrapper}>
              <div className={styles.product__photos}>
                {selectedProduct.images.map((image, index) => (
                  <div
                    className={classNames(styles.product__photo, {
                      [styles.product__activeImg]: activeImg === image,
                    })}
                    key={index}
                    onClick={() => handleImgClick(image)}
                  >
                    <img className={styles.product__img} src={image} />
                  </div>
                ))}
              </div>

              <div className={styles.product__activeImage}>
                {activeImg && (
                  <img className={styles.product__mainImage} src={activeImg} />
                )}
              </div>
            </div>

            <ProductAddInfo selectedProduct={selectedProduct} />
          </div>
        </>
      )}
    </div>
  );
};
