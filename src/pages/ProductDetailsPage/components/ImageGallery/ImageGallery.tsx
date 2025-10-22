import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import styles from './ImageGallery.module.scss';

interface ImageGalleryProps {
  images: string[]; // Масив URL-адрес зображень
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  const [activeImage, setActiveImage] = useState(images[0]); // Встановлюємо перше зображення як активне

  useEffect(() => {
    // Встановлюємо перше зображення з нового масиву як активне
    if (images.length > 0) {
      setActiveImage(images[0]);
    }
  }, [images]); // Залежність: виконується щоразу, коли змінюється масив images

  return (
    <div className={styles['product-gallery']}>
      {/* 1. Блок для прев'ю-зображень (зліва на десктопі, горизонтально на мобільному) */}
      <div className={styles['product-gallery__thumbnails']}>
        {images.map((imgUrl, index) => (
          <div
            key={index}
            className={classNames(styles['product-gallery__thumbnail-item'], {
              [styles['product-gallery__thumbnail-item--active']]:
                imgUrl === activeImage,
            })}
            onClick={() => setActiveImage(imgUrl)}
          >
            <img src={imgUrl} alt={`Thumbnail ${index + 1}`} />
          </div>
        ))}
      </div>

      {/* 2. Блок для головного зображення */}
      <div className={styles['product-gallery__main-image-container']}>
        <img
          key={activeImage}
          src={activeImage}
          alt="Main product view"
          className={styles['product-gallery__main-image']}
        />
      </div>
    </div>
  );
};

export default ImageGallery;
