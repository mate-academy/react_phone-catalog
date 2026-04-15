import React from 'react';
import styles from './ProductGallery.module.scss';
import { ProductDetails } from '../../../shared/types/ProductDetails';
import classNames from 'classnames';
import { getPublicPath } from '../../../shared/utils/pathHelper';

interface Props {
  product: ProductDetails;
  selectedImage: string | null;
  onSelectImage: (img: string) => void;
}

export const ProductGallery: React.FC<Props> = ({ product, selectedImage, onSelectImage }) => {
  const mainPhoto = selectedImage || product.images[0];

  return (
    <div className={styles.galleryBlock}>
      <div className={styles.photoPreviews}>
        {product.images.map(img => (
          <img
            key={img}
            src={getPublicPath(img)}
            alt="Preview"
            className={classNames(styles.preview, {
              [styles.active]: img === selectedImage,
            })}
            onClick={() => onSelectImage(img)}
          />
        ))}
      </div>
      <div className={styles.mainPhoto}>
        <img src={getPublicPath(mainPhoto)} alt={product.name} />
      </div>
    </div>
  );
};
