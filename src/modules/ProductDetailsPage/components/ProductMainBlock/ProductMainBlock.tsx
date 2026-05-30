import React, { useState } from 'react';
import classNames from 'classnames';
import styles from './ProductMainBlock.module.scss';
import { ProductDetailsAside } from '../ProductDetailsAside';
import { PhoneDetails } from '../../../../types/PhoneDetails';
import { useVariantsByNamespace } from '../../../../hooks/useVariantsByNamespace';
import { Product } from '../../../../types/Product';

type Props = {
  productDetails: PhoneDetails;
  productForCart: Product;
};

export const ProductMainBlock: React.FC<Props> = ({
  productDetails,
  productForCart,
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const { variants } = useVariantsByNamespace(productDetails.namespaceId);

  const images = Array.isArray(productDetails.images)
    ? productDetails.images.map((img: string) => `/react_phone-catalog/${img}`)
    : [];

  return (
    <div className={styles.content}>
      <div className={styles.gallery}>
        <div className={styles.imageWrapper}>
          <img
            src={images[selectedImageIndex]}
            alt={productDetails.namespaceId}
            className={styles.mainImage}
          />
        </div>

        <div className={styles.previewList}>
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setSelectedImageIndex(index)}
              className={classNames(styles.previewButton, {
                [styles.active]: index === selectedImageIndex,
              })}
            >
              <img
                src={img}
                alt={`preview-${index}`}
                className={styles.previewImage}
              />
            </button>
          ))}
        </div>
      </div>
      <div className={styles.infoBlock}>
        <ProductDetailsAside
          productDetails={productDetails}
          productForCart={productForCart}
          variants={variants}
        />
      </div>
    </div>
  );
};
