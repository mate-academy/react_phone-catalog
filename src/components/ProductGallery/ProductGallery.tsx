import React, { useState } from 'react';
import styles from './ProductGallery.module.scss';
type Props = {
  images: string[];
  productName: string;
};

export const ProductGallery: React.FC<Props> = ({ images, productName }) => {
  const [activeImage, setActiveImage] = useState(images[0] ?? '');

  return (
    <div className={styles.gallery}>
      <div className={styles.gallery__thumbs}>
        {images.map(img => (
          <button
            key={img}
            type="button"
            className={`${styles.gallery__thumb} ${
              activeImage === img ? styles['gallery__thumb--active'] : ''
            }`}
            onClick={() => setActiveImage(img)}
          >
            <img src={img} alt={productName} />
          </button>
        ))}
      </div>

      <div className={styles.gallery__main}>
        <img src={activeImage} alt={productName} />
      </div>
    </div>
  );
};
