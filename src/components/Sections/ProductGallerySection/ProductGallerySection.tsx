import type { FC } from 'react';
import { useState } from 'react';
import cn from 'classnames';

import styles from './ProductGallerySection.module.scss';

interface ProductGallerySectionProps {
  images: string[];
  productName: string;
}

export const ProductGallerySection: FC<ProductGallerySectionProps> = ({
  images,
  productName,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const currentImageSrc = `/${images[activeImageIndex]}`;

  return (
    <section className={styles.productGallery}>
      <ul className={styles.productImglist}>
        {images.map((imgSrc, index) => (
          <li
            key={index}
            className={cn(styles.productImg, {
              [styles.active]: index === activeImageIndex,
              [styles.disabled]: index === activeImageIndex,
            })}
            onClick={() => {
              if (index !== activeImageIndex) {
                setActiveImageIndex(index);
              }
            }}
          >
            <img
              src={`/${imgSrc}`}
              alt={`${productName} thumbnail ${index + 1}`}
              className={styles.thumbnail}
            />
          </li>
        ))}
      </ul>
      <div className={styles.imgBox}>
        <img
          src={currentImageSrc}
          alt={productName}
          className={styles.mainProductImg}
        />
      </div>
    </section>
  );
};
