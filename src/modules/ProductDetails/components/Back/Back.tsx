import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { ProductsContext } from '../../../../context/ProductsContext';
import { LeftArrowSVG } from '../../../../svgs/LeftArrowSVG';
import styles from './Back.module.scss';

export const Back: React.FC = () => {
  const { comebackLocations, setComebackLocations } =
    useContext(ProductsContext);

  const navigate = useNavigate();

  const onClickHandler = () => {
    if (comebackLocations.length > 0) {
      navigate(comebackLocations[comebackLocations.length - 1]);
      setComebackLocations(locations => locations.slice(0, -1));

      return;
    }

    navigate(-1);
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
