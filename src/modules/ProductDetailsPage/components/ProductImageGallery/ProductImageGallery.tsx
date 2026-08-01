import React, { useState } from 'react';
import styles from './ProductImageGallery.module.scss';

type GalleryProps = {
  images: string[];
  name: string;
};
export const ProductImageGallery = ({ images, name }: GalleryProps) => {
  const [currentImage, setCurrentImage] = useState(images[0]);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleImage = (image: string, index: number) => {
    if (image !== currentImage) {
      setCurrentImage(image);
      setActiveIndex(index);
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
        {images.map((image, index) => (
          <div
            onClick={() => handleImage(image, index)}
            key={image}
            className={`${styles.smallImg} ${activeIndex === index ? styles.active : ''}`}
          >
            <img className={styles.smallImg__item} src={image} alt={name} />
          </div>
        ))}
      </div>
    </div>
  );
};
