import React, { useState } from 'react';
import classNames from 'classnames';
import styles from './ProductGallery.module.scss';

interface Props {
  images: string[] | string;
  name: string;
}

export const ProductGallery: React.FC<Props> = ({ images, name }) => {
  const [selectedImage, setSelectedImage] = useState(0);

  const imagesArray = Array.isArray(images) ? images : [images];

  if (imagesArray.length === 0) {
    return (
      <div className={styles.gallery}>
        <div className={styles.gallery__placeholder}>No images available</div>
      </div>
    );
  }

  return (
    <div className={styles.gallery}>
      <div className={styles.gallery__thumbnails}>
        {imagesArray.map((image, index) => (
          <button
            key={index}
            className={classNames(styles.gallery__thumbnail, {
              [styles.gallery__thumbnail_active]: index === selectedImage,
            })}
            onClick={() => setSelectedImage(index)}
          >
            <img
              src={`/${image}`}
              alt={`${name} view ${index + 1}`}
              className={styles.gallery__thumbnailImage}
            />
          </button>
        ))}
      </div>

      <div className={styles.gallery__main}>
        <img
          src={`/${imagesArray[selectedImage]}`}
          alt={`${name} main view`}
          className={styles.gallery__mainImage}
        />
      </div>
    </div>
  );
};
