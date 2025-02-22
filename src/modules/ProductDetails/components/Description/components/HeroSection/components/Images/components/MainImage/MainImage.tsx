/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable max-len */
import React, { useContext, useEffect } from 'react';
import styles from './MainImage.module.scss';
import { ProductsContext } from '../../../../../../../../../../context/ProductsContext';
import { CurrentProduct } from '../../../../../../../../../../context/ProductsContext/types/CurrentProduct';

export const MainImage: React.FC = () => {
  const { currentProduct, setCurrentImage, currentImage, searchImageParam } =
    useContext(ProductsContext);

  const { name, images, id } = currentProduct as CurrentProduct;

  useEffect(() => {
    if (searchImageParam) {
      setCurrentImage(images[+searchImageParam - 1]);
    } else {
      setCurrentImage(images[0]);
    }
  }, [searchImageParam, currentProduct]);

  return (
    <img
      key={id}
      src={`/${currentImage}`}
      alt={name}
      className={styles['main-image']}
    />
  );
};
