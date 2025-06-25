import React, { useState } from 'react';
import classNames from 'classnames';
import styles from './ProductMainBlock.module.scss';
// import { useProducts } from '../../../../hooks/useProducts';
// import { useVariantsByNamespace } from '../../../../hooks/useVariantsByNamespace';
// import { useProductDetails } from '../../../../hooks/useProductDetails';
// import { useErrorHandling } from '../../../../hooks/errorHandling';
import { ProductDetailsAside } from '../ProductDetailsAside';
import { PhoneDetails } from '../../../../types/PhoneDetails';
import { useVariantsByNamespace } from '../../../../hooks/useVariantsByNamespace';

type Props = {
  product: PhoneDetails;
};

export const ProductMainBlock: React.FC<Props> = ({ product }) => {
  // const { setIsError } = useErrorHandling();
  // const { products } = useProducts(() => setIsError(true));
  // const { productDetails } = useProductDetails(productId);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const { variants } = useVariantsByNamespace(product.namespaceId);

  const images = Array.isArray(product.images)
    ? product.images.map((img: string) => `/react_phone-catalog/${img}`)
    : [];

  return (
    <div className={styles.content}>
      <div className={styles.gallery}>
        <div className={styles.imageWrapper}>
          <img
            src={images[selectedImageIndex]}
            alt={product.namespaceId}
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
        <ProductDetailsAside product={product} variants={variants} />
      </div>
    </div>
  );
};
