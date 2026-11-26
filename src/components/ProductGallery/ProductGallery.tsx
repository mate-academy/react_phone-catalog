import React, { useState } from 'react';
import styles from './ProductGallery.module.scss';

interface Props {
  images: string[];
  name: string;
}

export const ProductGallery: React.FC<Props> = ({ images, name }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className={styles.gallery}>
      <div className={styles.gallery__thumbs}>
        {images.map((image, index) => (
          <button
            key={image}
            type="button"
            aria-label={`Show image ${index + 1}`}
            className={
              index === selectedIndex
                ? `${styles.gallery__thumb} ${styles.gallery__thumbActive}`
                : styles.gallery__thumb
            }
            onClick={() => setSelectedIndex(index)}
          >
            <img src={image} alt="" className={styles.gallery__thumbImage} />
          </button>
        ))}
      </div>

      <div className={styles.gallery__main}>
        <img
          src={images[selectedIndex]}
          alt={name}
          className={styles.gallery__image}
        />
      </div>
    </div>
  );
};
