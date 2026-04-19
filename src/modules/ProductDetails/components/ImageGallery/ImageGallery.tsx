import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import styles from './ImageGallery.module.scss';

import { ProductDetailsType } from '../../../../types/product-details.types';

interface ImageGalleryProps {
  details: ProductDetailsType;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({ details }) => {
  const [mainImage, setMainImage] = useState(details.images[0]);
  const [isImageLoading, setIsImageLoading] = useState(false);

  useEffect(() => {
    if (details.images.length > 0) {
      setMainImage(details.images[0]);
    }
  }, [details.images]);

  if (!details || !details.images) {
    return <div className={styles.loader}>No images available</div>;
  }

  return (
    <div className={styles.imagesBlock}>
      <div className={styles.mainImageBoss}>
        <img
          className={classNames(
            styles.imageBoss,
            {
              [styles.imageLoading]: isImageLoading,
            }
          )}
          src={mainImage}
          alt={details.name}
          onLoad={() => setIsImageLoading(false)}
        />

        {isImageLoading && (
          <div className={styles.overlay} />
        )}
      </div>

      <div className={styles.imagesBox}>
        {details.images.map(img => (
          <button
            key={img}
            type="button"
            disabled={isImageLoading}
            className={classNames(
              styles.imgButton,
              {
                [styles.active]: mainImage === img,
                [styles.disabled]: isImageLoading,
              }
            )}

            onClick={() => {
              if (mainImage !== img) {
                setIsImageLoading(true);
                setMainImage(img);
              }
            }}
          >
            <img className={styles.thumbnail} src={img} alt="Thumbnail" />
          </button>
        ))}
      </div>
    </div>
  );
};
