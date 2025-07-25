import React, { useState } from 'react';
import styles from './ProductImageGallery.module.scss';

type GalleryProps = {
  images: string[];
  name: string;
};
export const ProductImageGallery = ({ images, name }: GalleryProps) => {
  const [currentImage, setCurrentImage] = useState(images[0]);

  const handleImage = (image: string) => {
    if (image !== currentImage) {
      setCurrentImage(image);
    }
  };

  return (
    <div className={styles.toolImgContainer}>
      <div className={styles.mainImg}>
        <img
          className={styles.mainImg__picture}
          src={currentImage}
          alt={name}
        />
      </div>
      <div className={styles.wrapperSmallImg}>
        {images.map(image => (
          <div
            onClick={() => handleImage(image)}
            key={image}
            className={styles.smallImg}
          >
            <img className={styles.smallImg__item} src={image} alt={name} />
          </div>
        ))}
      </div>
    </div>
  );
};
