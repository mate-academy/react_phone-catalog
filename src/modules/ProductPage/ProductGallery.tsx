import React, { useEffect, useState } from 'react';
import styles from './ProductPage.module.scss';
import cn from 'classnames';

type ProductGalleryProps = {
  photos?: string[];
};

const ProductGallery: React.FC<ProductGalleryProps> = ({ photos }) => {
  const [validPhotos, setValidPhotos] = useState<string[]>(photos ?? []);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState<number>(0);

  // якщо пропи photos зміняться — оновлюємо стейт
  useEffect(() => {
    setValidPhotos(photos ?? []);
    setCurrentPhotoIndex(0);
  }, [photos]);

  const handleImageError = (badIndex: number) => {
    setValidPhotos((prev) => {
      if (!prev[badIndex]) return prev;

      const next = prev.filter((_, i) => i !== badIndex);

      // підлаштовуємо currentPhotoIndex під новий масив
      setCurrentPhotoIndex((prevIndex) => {
        if (next.length === 0) return 0;

        // якщо видалили поточне фото
        if (prevIndex === badIndex) {
          // якщо це був останній елемент — беремо новий останній
          return badIndex >= next.length ? next.length - 1 : badIndex;
        }

        // якщо видалили елемент перед поточним — зсуваємо індекс
        if (prevIndex > badIndex) {
          return prevIndex - 1;
        }

        return prevIndex;
      });

      return next;
    });
  };

  const hasPhotos = validPhotos.length > 0;

return (
  <div className={styles['product-gallery']}>
    <div className={styles['product-gallery__thumbnails']}>
      {hasPhotos &&
        validPhotos.map((photo, index) => (
          <div
            key={index}
            className={cn(
              styles['product-gallery__thumbnail'],
              index === currentPhotoIndex &&
                styles['product-gallery__thumbnail--active']
            )}
            onClick={() => setCurrentPhotoIndex(index)}
          >
            <img
              className={styles['product-gallery__thumbnail-image']}
              src={photo}
              alt={`Product photo ${index + 1}`}
              onError={() => handleImageError(index)}
            />
          </div>
        ))}
    </div>

    <div className={styles['product-gallery__main-photo']}>
      {hasPhotos ? (
        <img
          className={styles['product-gallery__main-photo-image']}
          src={validPhotos[currentPhotoIndex]}
          alt={`Product photo ${currentPhotoIndex + 1}`}
          onError={() => handleImageError(currentPhotoIndex)}
        />
      ) : (
        <div className={styles['product-gallery__no-photo']}>
          {/* Custom placeholder text */}
          No photos available
        </div>
      )}
    </div>
  </div>
);
};

export default ProductGallery;
