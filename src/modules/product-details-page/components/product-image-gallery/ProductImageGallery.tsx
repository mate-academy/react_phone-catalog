import React from 'react';
import classNames from 'classnames';
import styles from './ProductImageGallery.module.scss';

interface Props {
  images: string[];
  productName: string;
  mainImageIndex: number;
  onImageSelect: (index: number) => void;
}

export const ProductImageGallery: React.FC<Props> = ({
  images,
  productName,
  mainImageIndex,
  onImageSelect,
}) => {
  return (
    <div className={styles.gallery}>
      <div className={styles['gallery__main-container']}>
        <img
          src={`./${images[mainImageIndex]}`}
          alt={`${productName} - main view ${mainImageIndex + 1}`}
        />
      </div>

      <div className={styles['gallery__preview-list']}>
        {images.map((img, i) => (
          <div
            className={classNames(styles['gallery__preview-item'], {
              [styles['gallery__preview-item--selected']]: mainImageIndex === i,
            })}
            key={img}
            onClick={() => onImageSelect(i)}
          >
            <img src={`./${img}`} alt={`${productName} - preview ${i + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
};
