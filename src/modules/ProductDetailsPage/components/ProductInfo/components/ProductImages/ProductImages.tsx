import React, { useEffect, useState } from 'react';
import styles from './ProductImages.module.scss';
import { Goods } from '../../../../../../types/Goods';

type Props = {
  product: Goods;
};

export const ProductImages: React.FC<Props> = ({ product }) => {
  const [mainImage, setMainImage] = useState(product.images[0]);

  useEffect(() => {
    setMainImage(product.images[0]);
  }, [product]);

  return (
    <>
      <div className={styles['product-info__main-image']}>
        <img src={mainImage} alt="main-image" />
      </div>

      <div className={styles['product-info__images']}>
        {product.images.map(image => (
          <div
            key={image}
            className={`${styles['product-info__image']} ${image === mainImage ? styles.active : ''}`}
            onClick={() => setMainImage(image)}
          >
            <img src={image} alt="product" />
          </div>
        ))}
      </div>
    </>
  );
};
