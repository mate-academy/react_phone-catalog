import React, { useEffect, useState } from 'react';
import styles from './ImageGallery.module.scss';
import { BASE_URL } from '../../utils/const';
import classNames from 'classnames';

interface Props {
  images: string[];
  name: string;
}

const ImageGallery: React.FC<Props> = ({ images, name }) => {
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
            alt={`${name}`}
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
            alt={name}
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
            alt={`${name}`}
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

export default ImageGallery;
