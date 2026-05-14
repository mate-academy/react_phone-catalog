import React from 'react';

import styles from './ProductGallery.module.scss';

interface ProductGalleryProps {
  images: string[];
  selectedImage: string;
  onSelect: (image: string) => void;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({
  images,
  selectedImage,
  onSelect,
}) => {
  return (
    <div className={styles.gallery}>
      <div className={styles.gallery__thumbnails}>
        {images.map(image => {
          return (
            <img
              key={image}
              src={image}
              className={
                image === selectedImage
                  ? styles['gallery__thumbnail--active']
                  : ''
              }
              onClick={() => onSelect(image)}
              alt="Product thumbnail"
            />
          );
        })}
      </div>
      <img
        src={selectedImage}
        className={styles.gallery__main}
        alt="Product image"
      />
    </div>
  );
};
