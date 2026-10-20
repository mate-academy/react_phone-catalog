import type React from 'react';
import styles from './Gallery.module.scss';
import { asset } from '../../../../helper';

type Props = {
  images: string[];
  currentImage: string;
  setSelectedImage: (image: string) => void;
  productName?: string;
};

export const Gallery: React.FC<Props> = ({
  images,
  currentImage,
  setSelectedImage,
  productName = 'Product',
}) => {
  return (
    <div className={styles.gallery}>
      <div className={styles['main-image-container']}>
        <img src={asset(currentImage)} alt={productName} />
      </div>
      <div className={styles['thumb-list']}>
        {images.map((imgUrl, index) => (
          <button
            key={imgUrl || index}
            type="button"
            className={`${styles['thumb-item']} ${
              currentImage === imgUrl ? styles['thumb-item--active'] : ''
            }`}
            onClick={() => setSelectedImage(imgUrl)}
          >
            <img src={asset(imgUrl)} alt={`${productName} - ${index + 1}`} />
          </button>
        ))}
      </div>
    </div>
  );
};
