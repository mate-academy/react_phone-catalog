import React, { useEffect, useState } from 'react';
import styles from './ImgsSlider.module.scss';
import { ProductInfo } from '../../../../types/ProductInfo';

type Props = {
  product: ProductInfo;
};

export const ImgsSlider: React.FC<Props> = ({ product }) => {
  const [selectedImg, setSelectedImg] = useState(product.images[0]);

  const handleImageClick = (image: string) => {
    setSelectedImg(image);
  };

  useEffect(() => {
    setSelectedImg(product.images[0]);
  }, [product.images]);

  return (
    <div className={styles.sliderWrap}>
      <div className={styles.imgMainWrapMob}>
        <img
          src={selectedImg}
          alt={product.namespaceId}
          className={styles.imgMain}
        />
      </div>

      <div className={styles.imgSmallWrap}>
        {product.images.map((image, index) => (
          <div
            key={index}
            className={
              image === selectedImg
                ? styles.imgSmallBorderActive
                : styles.imgSmallBorder
            }
          >
            <img
              src={image}
              alt={product.namespaceId}
              className={styles.imgSmall}
              onClick={() => handleImageClick(image)}
            />
          </div>
        ))}
      </div>

      <div className={styles.imgMainWrap}>
        <img
          src={selectedImg}
          alt={product.namespaceId}
          className={styles.imrMain}
        />
      </div>
    </div>
  );
};
