import React, { useEffect, useState } from 'react';
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
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const index = images.indexOf(selectedImage);

    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  }, [selectedImage, images, activeIndex]);

  return (
    <div className={styles.imageGallery}>
      <div className={styles.thumbnailContainerTablet}>
        {images.map(image => (
          <img
            key={image}
            src={`${BASE_URL}/${image}`}
            alt={`${productName}`}
            className={classNames(styles.thumbnail, {
              [styles.selectedThumbnail]: image === selectedImage,
            })}
            onClick={() => setSelectedImage(image)}
          />
        ))}
      </div>

      <div className={styles.mainImageContainer}>
        {images.map((image, index) => (
          <img
            key={image}
            src={`${BASE_URL}/${image}`}
            alt={productName}
            className={classNames(styles.mainImage, {
              [styles.mainImageActive]: index === activeIndex,
            })}
          />
        ))}
      </div>
      <div className={styles.thumbnailContainerMobile}>
        {images.map(image => (
          <img
            key={image}
            src={`${BASE_URL}/${image}`}
            alt={`${productName}`}
            className={classNames(styles.thumbnail, {
              [styles.selectedThumbnail]: image === selectedImage,
            })}
            onClick={() => setSelectedImage(image)}
          />
        ))}
      </div>
    </div>
  );
};
