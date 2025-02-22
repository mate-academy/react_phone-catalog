/* eslint-disable max-len */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext } from 'react';
import styles from './Images.module.scss';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import { SearchContext } from '../../../../../../../../context/SearchContext';
import { ProductsContext } from '../../../../../../../../context/ProductsContext';
import { CurrentProduct } from '../../../../../../../../context/ProductsContext/types/CurrentProduct';
import { MainImage } from './components/MainImage';
import { MainContext } from '../../../../../../../../context/MainContext';

export const Images: React.FC = () => {
  // #region context

  const { isTablet } = useContext(MainContext);
  const { getSearchWith } = useContext(SearchContext);
  const { currentProduct, IMAGE_PARAM, setCurrentImage, currentImage } =
    useContext(ProductsContext);

  // #endregion

  const { images, id } = currentProduct as CurrentProduct;
  const navigate = useNavigate();

  // #region handlers

  const onClickHandler = (img: string) => {
    const value = String(images.indexOf(img) + 1);

    navigate({ search: getSearchWith({ [IMAGE_PARAM]: value }) });
    setCurrentImage(img);
  };

  // #endregion

  return (
    <>
      {!isTablet && <MainImage />}
      <div className={styles['imgs-wrapper']}>
        {images.map((img, index) => {
          return (
            <img
              key={`${id}-${index}`}
              src={`/public/${img}`}
              alt="Phone image"
              onClick={() => onClickHandler(img)}
              className={classNames(styles.img, {
                [styles['is-active']]: currentImage === img,
              })}
            />
          );
        })}
      </div>
    </>
  );
};
