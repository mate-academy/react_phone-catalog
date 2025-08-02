import React, { useEffect, useState } from 'react';

import styles from './../../../ProductPage.module.scss';
import classNames from 'classnames';
import { ProductDetails } from '../../../../../types/ProductDetails';
import { Image } from '../../../../shared/atoms/Image';

type Props = {
  productDetails: ProductDetails;
};

export const ProductGallery: React.FC<Props> = ({ productDetails }) => {
  const [selectedImage, setSelectedImage] = useState(productDetails?.images[0]);

  useEffect(
    () => setSelectedImage(productDetails.images[0]),
    [productDetails?.images],
  );
  return (
    <div className={classNames(styles.product__block, styles.product__gallery)}>
      <div className={styles.product__slider}>
        {productDetails?.images.map(image => (
          <div key={image} onClick={() => setSelectedImage(image)}>
            <Image
              className={classNames(styles.product__slider__img, {
                [styles['product__slider__img--active']]:
                  selectedImage === image,
              })}
              src={image}
              alt="iphone-img"
            />
          </div>
        ))}
      </div>
      <div className={styles.product__image}>
        <Image
          className={styles.product__image__img}
          key={selectedImage}
          src={selectedImage}
          alt="iphone-img"
        />
      </div>
    </div>
  );
};
