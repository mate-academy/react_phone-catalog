import React, { useEffect, useState } from 'react';
import { ProductDetails } from '../../../../types/Product';
import styles from './ProductGallery.module.scss';

type Props = {
  productDetails: ProductDetails;
};

export const ProductGallery: React.FC<Props> = ({ productDetails }) => {
  const [selectedImage, setSelectedImage] = useState(productDetails.images[0]);

  useEffect(() => {
    setSelectedImage(productDetails.images[0]);
  }, [productDetails]);

  return (
    <div className={styles.gallery}>
      <div className={styles.mainImageWrapper}>
        <img
          src={`${selectedImage}`}
          alt={productDetails.name}
          className={styles.mainImage}
        />
      </div>
      <div className={styles.thumbnails}>
        {productDetails.images.map(img => (
          <button
            key={img}
            type="button"
            className={`${styles.thumbnail} ${
              img === selectedImage ? styles.active : ''
            }`}
            onClick={() => setSelectedImage(img)}
          >
            <img
              src={`${img}`}
              alt={productDetails.name}
              className={styles.thumbnailImage}
            />
          </button>
        ))}
      </div>
    </div>
  );
};
