import React from 'react';
import { ProductDetails } from '../../types/ProductDetails';
import styles from './ProductImgsGallery.module.scss';
import classNames from 'classnames';

type Props = {
  setSelectedImg: (value: React.SetStateAction<string>) => void;
  product: ProductDetails;
  selectedImg: string;
};

export const ProductImgsGallery: React.FC<Props> = ({
  setSelectedImg,
  product,
  selectedImg,
}) => {
  return (
    <div className={styles.productImgsGallery}>
      <div className={styles.productImgsGallery__smallBlock}>
        {product.images.map(img => (
          <button onClick={() => setSelectedImg(img)} key={img} type="button">
            <img
              className={classNames(styles.productImgsGallery__small, {
                [styles.productImgsGallery__smallActive]: selectedImg === img,
              })}
              src={img}
              alt="product imagage"
            />
          </button>
        ))}
      </div>

      <div className={styles.productImgsGallery__bigBlock}>
        <img
          className={styles.productImgsGallery__bigImg}
          src={selectedImg}
          alt="product imagage"
        />
      </div>
    </div>
  );
};
