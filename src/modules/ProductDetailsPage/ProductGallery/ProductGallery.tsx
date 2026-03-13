import React from 'react';
import cl from 'classnames';

import styles from './ProductGallery.module.scss';

type Props = {
  name: string;
  images: string[];
  activeImage: string;
  setActiveImage: (img: string) => void;
};

export const ProductGallery: React.FC<Props> = ({
  name,
  images,
  activeImage,
  setActiveImage,
}) => {
  return (
    <div className={styles.gallery}>
      <div className={styles.mainImageWrapper}>
        <img
          src={activeImage || images[0]}
          alt={name}
          className={styles.mainImage}
        />
      </div>

      <div className={styles.thumbnailsContainer}>
        {images.map((img, index) => (
          <div
            key={index}
            className={cl(styles.thumbnailWrapper, {
              [styles.active]: (activeImage || images[0]) === img,
            })}
            onClick={() => setActiveImage(img)}
          >
            <img
              src={img}
              alt={`Thumbnail ${index + 1}`}
              className={styles.thumbnailImage}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
