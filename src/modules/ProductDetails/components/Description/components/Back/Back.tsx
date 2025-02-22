import React, { useContext } from 'react';
import { LeftArrowSVG } from '../../../../../../svgs/LeftArrowSVG';
import styles from './Back.module.scss';
import { useNavigate } from 'react-router-dom';
import { ProductsContext } from '../../../../../../context/ProductsContext';
// eslint-disable-next-line max-len
import { CurrentProduct } from '../../../../../../context/ProductsContext/types/CurrentProduct';

export const Back: React.FC = () => {
  const navigate = useNavigate();
  const { comebackLocations, currentProduct, setComebackLocations } =
    useContext(ProductsContext);
  const { category } = currentProduct as CurrentProduct;

  const onClickHandler = () => {
    if (comebackLocations.length > 0) {
      navigate(comebackLocations[comebackLocations.length - 1]);
      setComebackLocations(locations => locations.slice(0, -1));

      return;
    }

    navigate(`/${category}`);
  };

  return (
    <div className={styles.back}>
      <LeftArrowSVG />
      <div onClick={onClickHandler} className={styles['back-text']}>
        Back
      </div>
    </div>
  );
};
