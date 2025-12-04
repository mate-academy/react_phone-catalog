import React, { useState } from 'react';
import styles from './ProductPage.module.scss';
import cn from 'classnames';

type ProductGalleryProps = {
  photos?: string[];
};

const ProductGallery: React.FC<ProductGalleryProps> = ({ photos }) => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState<number>(0);

  return (
    <div className={styles.productGallery}>
      <div className={styles.productGallery__thumbnails}>
        {photos?.map((photo, index) => (
          <div
            key={photo}
            className={cn(
              styles.productGallery__thumbnail,
              index === currentPhotoIndex &&
                styles.productGallery__thumbnail_active
            )}
            onClick={() => setCurrentPhotoIndex(index)}
          >
            <img
              className={styles.productGallery__thumbnailImage}
              src={photo}
              alt={`Product Photo ${index + 1}`}
            />
          </div>
        ))}
      </div>

      <div className={styles.productGallery__mainPhoto}>
        <img
          className={styles.productGallery__mainPhotoImage}
          src={photos?.[currentPhotoIndex]}
          alt={`Product Photo ${currentPhotoIndex + 1}`}
        />
      </div>
    </div>
  );
};

export default ProductGallery;
