import React, { useState } from 'react';
import styles from './ImageGallery.module.scss';
import classNames from 'classnames';
import { BASE_URL } from '../../../../utils/const';

type ImageGalleryProps = {
  images: string[];
  productName: string;
};

export const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  productName,
}) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className={styles.imageGallery}>
      <div className={styles.thumbnailContainerTablet}>
        {images.map(image => (
          <img
            key={image}
            src={`${BASE_URL}/${image}`}
            alt={`Thumbnail of ${productName}`}
            className={classNames(styles.thumbnail, {
              [styles.selectedThumbnail]: image === selectedImage,
            })}
            onClick={() => setSelectedImage(image)}
          />
        ))}
      </div>

      <div className={styles.mainImageContainer}>
        <img
          src={`${BASE_URL}/${selectedImage}`}
          alt={productName}
          className={styles.mainImage}
        />
      </div>
      <div className={styles.thumbnailContainerMobile}>
        {images.map(image => (
          <img
            key={image}
            src={`/${image}`}
            alt={`Thumbnail of ${productName}`}
            className={styles.thumbnail}
            onClick={() => setSelectedImage(image)}
          />
        ))}
      </div>
    </div>
  );
};
