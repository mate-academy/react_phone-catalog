import React from 'react';
import styles from './RetryErrorMessage.module.scss';

import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../../../../hooks/hooks';
import { init as initProducts } from '../../../../features/productsSlice';
import { init as initFavourites } from '../../../../features/favouritesSlice';
import { init as initCart } from '../../../../features/cartSlice';
import { init as initPhones } from '../../../../features/phonesSlice';
import { init as initTablets } from '../../../../features/tabletsSlice';
import { init as initAccessories } from '../../../../features/accessoriesSlice';
import { Typography } from '../../atoms/Typography';
import { Button } from '../../atoms/Button';

export const RetryErrorMessage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { t } = useTranslation();

  const dispatchData = async () => {
    dispatch(initProducts());
    dispatch(initFavourites());
    dispatch(initCart());
    dispatch(initPhones());
    dispatch(initTablets());
    dispatch(initAccessories());
    navigate(`${pathname}`);
  };

  return (
    <div className={styles.error}>
      <img className={styles.error__image} src="images/error.png" alt="" />
      <div className={styles.error__message}>
        <Typography
          variant="h1"
          tag="p"
          className={styles.error__message__text}
        >
          {t('error.unknown')}
        </Typography>
      </div>
      <Button
        className={styles.error__button}
        size="large"
        onClick={dispatchData}
      >
        <Typography variant="buttons" className={styles.error__button__text}>
          {t('error.retry')}
        </Typography>
      </Button>
    </div>
  );
};
