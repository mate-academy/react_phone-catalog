import React, { useState } from 'react';
import styles from './ProductGallery.module.scss';

type Props = {
  images: string[];
  colors?: string[];
  capacities?: string[];
  initialColor?: string;
  initialCapacity?: string;
};

export const ProductGallery: React.FC<Props> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className={styles.gallery}>
      <div className={styles.mainImage}>
        <img src={`/${selectedImage}`} alt="Selected" />
      </div>
      <div className={styles.thumbs}>
        {images.map((img, index) => (
          <button
            key={index}
            className={styles.thumb}
            onClick={() => setSelectedImage(img)}
          >
            <img src={`/${img}`} alt="thumb" />
          </button>
        ))}
      </div>
    </div>
  );
};
