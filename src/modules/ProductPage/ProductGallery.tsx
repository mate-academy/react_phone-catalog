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
      <div className={styles.productGallery_thumbnails}>
        {photos?.map((photo, index) => (
          <div
            key={photo}
            className={cn(
              styles.productGallery_thumbnail,
              index === currentPhotoIndex &&
                styles.productGallery_thumbnailActive,
            )}
            onClick={() => setCurrentPhotoIndex(index)}
          >
            <img
              className={styles.productGallery_thumbnailImage}
              src={photo}
              alt={`Product Photo ${index + 1}`}
            />
          </div>
        ))}
      </div>
      <div className={styles.productGallery_mainPhoto}>
        <img
          className={styles.productGallery_mainPhotoImage}
          src={photos?.[currentPhotoIndex]}
          alt={`Product Photo ${currentPhotoIndex + 1}`}
        />
      </div>
    </div>
  );
};

export default ProductGallery;
