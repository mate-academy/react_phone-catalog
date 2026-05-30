import React, { useState } from 'react';
import styles from './ProductGallery.module.scss';
import classNames from 'classnames';
import { ProductType } from '../../types/ProductType';

type Props = {
  img: string;
  setImg: React.Dispatch<React.SetStateAction<string>>;
  product: ProductType | null;
};

export const ProductGallery: React.FC<Props> = ({ img, setImg, product }) => {
  const [fade, setFade] = useState(false);

  const handleImageChange = (newImage: string) => {
    if (img !== newImage) {
      setFade(true);

      setTimeout(() => {
        setImg(newImage);
        setFade(false);
      }, 300);
    }
  };

  return (
    <div className={styles.gallery}>
      <div className={styles.gallery__large}>
        <img
          src={img}
          alt={product?.name}
          className={classNames(
            styles.gallery__img,
            fade && styles['fade-out'],
          )}
        />
      </div>
      <ul className={styles.gallery__list}>
        {product?.images &&
          product.images.map(image => (
            <li
              key={image}
              className={classNames(
                styles.gallery__item,
                image === img && styles.gallery__item_active,
              )}
              onClick={() => handleImageChange(image)}
            >
              <img
                src={image}
                alt={product?.name}
                className={styles.gallery__img}
              />
            </li>
          ))}
      </ul>
    </div>
  );
};
