import React, { useState, useEffect } from 'react';
import { getAssetUrl } from '../../../../utils/getAssetUrl'; // Перевірте шлях до utils
import styles from './ImageGallery.module.scss';

interface Props {
  images: string[];
  title: string;
}

export const ImageGallery: React.FC<Props> = ({ images, title }) => {
  const [selectedImage, setSelectedImage] = useState<string>(images[0] || '');

  // Оновлюємо вибрану картинку при зміні списку images (наприклад, зміні кольору)
  useEffect(() => {
    if (images.length > 0) {
      setSelectedImage(images[0]);
    }
  }, [images]);

  const mainImg = selectedImage || images[0] || '';

  return (
    <div className={styles.gallery}>
      <div className={styles.gallery__thumbnails}>
        {images.map(img => (
          <button
            key={img}
            type="button"
            className={`${styles.gallery__thumb} ${
              selectedImage === img ? styles.gallery__thumbActive : ''
            }`}
            onClick={() => setSelectedImage(img)}
          >
            <img src={getAssetUrl(img)} alt={`${title} thumbnail`} />
          </button>
        ))}
      </div>
      <div className={styles.gallery__mainImage}>
        <img src={getAssetUrl(mainImg)} alt={title} />
      </div>
    </div>
  );
};
