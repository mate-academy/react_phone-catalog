import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import styles from './ProductGallery.module.scss';

export const ProductGallery: React.FC<{ images: string[] }> = ({ images }) => {
  const [mainImage, setMainImage] = useState(images[0]);

  useEffect(() => {
    setMainImage(images[0]);
  }, [images]);

  return (
    <div className={styles.gallery}>
      <div className={styles.mainImageContainer}>
        <img
          src={`${import.meta.env.BASE_URL}/${mainImage}`}
          alt="Product"
          className={styles.mainImage}
        />
      </div>

      <div className={styles.thumbnails}>
        {images.map(image => (
          <button
            key={image}
            type="button"
            className={classNames(styles.thumbnailBtn, {
              [styles.thumbnailActive]: image === mainImage,
            })}
            onClick={() => setMainImage(image)}
          >
            <img
              src={`${import.meta.env.BASE_URL}/${image}`}
              alt="Thumbnail"
              className={styles.thumbnailImg}
            />
          </button>
        ))}
      </div>
    </div>
  );
};
