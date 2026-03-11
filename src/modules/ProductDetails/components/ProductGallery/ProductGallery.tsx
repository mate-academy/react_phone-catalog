import React, { useState } from 'react';
import styles from './ProductGallery.module.scss';

export const ProductGallery: React.FC<{ images: string[] }> = ({ images }) => {
  const [mainImage, setMainImage] = useState(images[0]);

  return (
    <div className={styles.gallery}>
      <img
        src={import.meta.env.BASE_URL + '/' + mainImage}
        alt="Product"
        className={styles.mainImage}
      />

      <div className={styles.thumbnails}>
        {images.map(image => (
          <img
            key={image}
            src={import.meta.env.BASE_URL + '/' + image}
            alt="Thumbnail"
            className={`${styles.thumbnail} ${
              image === mainImage ? styles.thumbnailActive : ''
            }`}
            onClick={() => setMainImage(image)}
          />
        ))}
      </div>
    </div>
  );
};
