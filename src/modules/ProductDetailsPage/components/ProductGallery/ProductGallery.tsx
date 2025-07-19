import React, { useState } from 'react';
import styles from './ProductGallery.module.scss';

type Props = {
  images: string[];
};

export const ProductGallery: React.FC<Props> = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!images.length) {
    return <p>No images</p>;
  }

  return (
    <div className={styles.gallery}>
      <div className={styles.thumbs}>
        {images.map((img, index) => (
          <button
            key={index}
            className={`${styles.thumb} ${index === activeIndex ? styles.active : ''}`}
            onClick={() => setActiveIndex(index)}
          >
            <img src={`/${img}`} alt={`Thumbnail ${index + 1}`} />
          </button>
        ))}
      </div>
      <div className={styles.mainImage}>
        <img src={`/${images[activeIndex]}`} alt="Main" />
      </div>
    </div>
  );
};
