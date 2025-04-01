import React from 'react';
import classNames from 'classnames';
import styles from './ProductGallery.module.scss';

interface ProductGalleryProps {
  images: string[];
  selectedImage: string;
  onImageSelect: (image: string) => void;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({
  images,
  selectedImage,
  onImageSelect,
}) => (
  <div className={styles.gallery}>
    <div className={styles.gallery__main}>
      <img
        className={styles.gallery__mainImage}
        src={`${import.meta.env.BASE_URL}/${selectedImage}`}
        alt="Selected product"
      />
    </div>
    <div className={styles.gallery__thumbnails}>
      {images.map(image => (
        <img
          key={image}
          src={`${import.meta.env.BASE_URL}/${image}`}
          alt="Thumbnail"
          className={classNames(styles.gallery__thumbnail, {
            [styles.active]: selectedImage === image,
          })}
          onClick={() => onImageSelect(image)}
        />
      ))}
    </div>
  </div>
);
