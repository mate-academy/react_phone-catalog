import { withBase } from '../../utils/withBase';
import cn from 'classnames';
import styles from './ProductGallery.module.scss';
import { useState } from 'react';

type ProductGalleryProps = {
  productName: string;
  productImages: string[];
  onSelectImage: (index: number) => void;
  imageIndex: number;
};

export const ProductGallery = ({
  productName,
  productImages,
  onSelectImage,
  imageIndex,
}: ProductGalleryProps) => {
  const [failedImages, setFailedImages] = useState<number[]>([]);

  const handleImageError = (index: number) => {
    setFailedImages(prev => (prev.includes(index) ? prev : [...prev, index]));
  };

  return (
    <div className={styles.gallery}>
      <ul className={styles.thumbs}>
        {productImages.map((image, index) => {
          if (failedImages.includes(index)) {
            return null;
          }

          return (
            <li key={image}>
              <button
                type="button"
                onClick={() => onSelectImage(index)}
                className={cn(styles.thumb, {
                  [styles.thumbActive]: imageIndex === index,
                })}
                aria-label={`${productName}, view ${index + 1}`}
              >
                <img
                  src={withBase(image)}
                  alt=""
                  className={styles.thumbImage}
                  onError={() => handleImageError(index)}
                />
              </button>
            </li>
          );
        })}
      </ul>

      <div className={styles.mainImageWrapper}>
        {productImages.map((image, index) => {
          if (failedImages.includes(index)) {
            return null;
          }

          return (
            <img
              key={image}
              src={withBase(image)}
              alt={`${productName}, view ${index + 1}`}
              className={cn(styles.image, {
                [styles.imageActive]: imageIndex === index,
              })}
              onError={() => handleImageError(index)}
            />
          );
        })}
      </div>
    </div>
  );
};
