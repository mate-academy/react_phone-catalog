import { useState } from 'react';
import styles from './ImageGallery.module.scss';

type Props = {
  images: string[];
  name: string;
};

const getImageUrl = (path: string) => {
  const baseUrl = import.meta.env.BASE_URL;
  let cleanPath = path.startsWith('public/')
    ? path.replace('public/', '')
    : path;

  cleanPath = cleanPath.startsWith('/') ? cleanPath.slice(1) : cleanPath;

  return baseUrl.endsWith('/')
    ? `${baseUrl}${cleanPath}`
    : `${baseUrl}/${cleanPath}`;
};

export const ImageGallery = ({ images, name }: Props) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className={styles.gallery}>
      <div className={styles.thumbnails}>
        {images.map((image, index) => (
          <button
            key={image}
            type="button"
            className={`${styles.thumbnail} ${
              index === activeIndex ? styles.thumbnailActive : ''
            }`}
            onClick={() => setActiveIndex(index)}
          >
            <img
              src={getImageUrl(image)}
              alt={`${name} thumbnail ${index + 1}`}
              className={styles.thumbnailImage}
            />
          </button>
        ))}
      </div>

      <div className={styles.mainImageWrapper}>
        <img
          src={getImageUrl(images[activeIndex])}
          alt={name}
          className={styles.mainImage}
        />
      </div>
    </div>
  );
};
