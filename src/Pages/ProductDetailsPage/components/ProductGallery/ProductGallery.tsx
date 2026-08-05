// ProductGallery.tsx
import { useState } from 'react';
import styles from './ProductGallery.module.scss';
import classNames from 'classnames';

interface ProductGalleryProps {
  images: string[];
}

export const ProductGallery = ({ images }: ProductGalleryProps) => {
  // Зберігаємо активне зображення (за замовчуванням перше)
  const [selectedImage, setSelectedImage] = useState(images[0] || '');

  return (
    <div className={styles.gallery}>
      {/* Список мініатюр */}
      <div className={styles.thumbnails}>
        {images.map(img => (
          <button
            key={img}
            type="button"
            className={classNames(styles.thumbButton, {
              [styles.active]: selectedImage === img,
            })}
            onClick={() => setSelectedImage(img)}
          >
            <img
              src={img}
              alt="Product thumbnail"
              className={styles.thumbImage}
            />
          </button>
        ))}
      </div>

      {/* Головне велике зображення */}
      <div className={styles.mainImageWrapper}>
        <img
          src={selectedImage}
          alt="Selected product"
          className={styles.mainImage}
        />
      </div>
    </div>
  );
};
