import React, { useState } from 'react';
import styles from './ProductImageGallery.module.scss';

interface Props {
  images: string[];
  productName: string;
  className?: string;
}

export const ProductImageGallery: React.FC<Props> = ({ images, productName, className }) => {
  const [selectedImage, setSelectedImage] = useState(0);

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className={`${styles.gallery} ${className || ''}`}>
      {/* Main Image - Always on top */}
      <div className={styles.mainImageContainer}>
        <img src={images[selectedImage]} alt={productName} className={styles.mainImage} />
      </div>

      {/* Thumbnails - Horizontal scroll on mobile, vertical on desktop */}
      {images.length > 1 && (
        <div className={styles.thumbnailsContainer}>
          <div className={styles.thumbnails}>
            {images.map((image, index) => (
              <button key={index} className={`${styles.thumbnail} ${selectedImage === index ? styles.thumbnailActive : ''}`} onClick={() => setSelectedImage(index)} type="button" aria-label={`View image ${index + 1} of ${images.length}`}>
                <img src={image} alt={`${productName} thumbnail ${index + 1}`} className={styles.thumbnailImage} />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
