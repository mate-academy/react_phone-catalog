/* eslint-disable max-len */
import React, { useMemo } from 'react';
import classNames from 'classnames';

import { idGenerator } from '../../../../utils/idGenerator';
import { formatSpecText } from '../../../../utils/formatSpecText';

import styles from './ProductConfig.module.scss';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../../../hooks/useCart';
import { useFavourite } from '../../../../hooks/useFavourite';
import { Product } from '../../../../types/Product';
import { hasDiscount } from '../../../../utils/hasDiscount';
import { useTranslation } from 'react-i18next';

interface Props {
  id: string;
  product: Product;
  productList: Product[];
  search: string;
  prevPath: string;
}

export const ProductConfig: React.FC<Props> = ({
  id,
  product,
  productList,
  search,
  prevPath,
}) => {
  const { t } = useTranslation('common');
  const [isAddedToCart, addToCart] = useCart(id, product);
  const [isAddedToFavourite, addToFavourite] = useFavourite(id, product);
  const navigate = useNavigate();

  const {
    colorsAvailable,
    color,
    category,
    capacityAvailable,
    priceDiscount,
    priceRegular,
    capacity,
    ram,
    processor,
    screen,
    resolution,
    name,
  } = product;

  const [randomID, formattedScreen, formattedRam] = useMemo(() => {
    return [idGenerator(), formatSpecText(screen), formatSpecText(ram)];
  }, [id]);

  const productsSameModel = productList.filter(
    item => item.namespaceId === product.namespaceId,
  );

  const withDiscount = hasDiscount(name);

  const changeSpec = (
    availableCapacity: string = capacity,
    availableColor: string = color,
  ) => {
    const differentProductId = productsSameModel.find(
      item =>
        item.color === availableColor && item.capacity === availableCapacity,
    )?.id;

    if (!differentProductId) {
      return;
    }

    navigate(`../${differentProductId}`, {
      state: {
        search,
        pathname: prevPath,
        id: differentProductId,
      },
    });
  };

  return (
    <div className={styles.productSpecsContainer}>
      <div className={styles.configContainer}>
        <span className={styles.subTitle}>{t('availableColors')}</span>
        <div className={styles.configSelection}>
          {colorsAvailable.map(availableColor => (
            <span
              className={classNames(
                styles.color,
                styles[`color${category}-${availableColor}`],
                {
                  [styles.colorIsActive]: availableColor === color,
                },
              )}
              key={availableColor}
              onClick={() => changeSpec(undefined, availableColor)}
            ></span>
          ))}
        </div>
        <span className={styles.randomID}>{randomID}</span>
      </div>
      <div className={styles.configContainer}>
        <span className={styles.subTitle}>{t('selectCapacity')}</span>
        <div className={styles.configSelection}>
          {capacityAvailable.map(availableCapacity => {
            return (
              <span
                className={classNames(styles.capacity, {
                  [styles.capacityIsActive]: availableCapacity === capacity,
                })}
                key={availableCapacity}
                onClick={() => changeSpec(availableCapacity, undefined)}
              >
                {formatSpecText(availableCapacity)}
              </span>
            );
          })}
        </div>
      </div>
      <div className={styles.priceContainer}>
        <p className={styles.price}>
          {'$' + (withDiscount ? priceDiscount : priceRegular)}
        </p>
        {withDiscount && (
          <p className={classNames(styles.price, styles.priceDiscount)}>
            {'$' + priceRegular}
          </p>
        )}
      </div>
      <div className={styles.btnContainer}>
        <button
          className={classNames('btnCart', styles.btnAddToCart, {
            btnCartPressed: isAddedToCart,
          })}
          onClick={addToCart}
          aria-label={t('accessibility.addToCart')}
          // disabled={isAddedToCart}
        >
          {isAddedToCart ? t('buttons.inCart') : t('buttons.addToCart')}
        </button>
        <button
          className={classNames('buttonFavourite', 'btnFavourite', {
            btnFavouritePressed: isAddedToFavourite,
          })}
          onClick={addToFavourite}
          aria-label={t('accessibility.addToFavorite')}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d={
                isAddedToFavourite
                  ? 'M11.3 1.29878C10.7264 1.29878 10.1584 1.4118 9.62852 1.63137C9.09865 1.85092 8.61711 2.17283 8.21162 2.57847L8.00005 2.79005L7.78835 2.57836C6.96928 1.75929 5.85839 1.29914 4.70005 1.29914C3.54171 1.29914 2.43081 1.75929 1.61174 2.57836C0.792668 3.39743 0.33252 4.50833 0.33252 5.66667C0.33252 6.82501 0.792668 7.9359 1.61174 8.75497L7.50507 14.6483C7.77844 14.9217 8.22165 14.9217 8.49502 14.6483L14.3884 8.75497C14.794 8.34949 15.1158 7.86806 15.3353 7.33819C15.5549 6.80827 15.6679 6.24028 15.6679 5.66667C15.6679 5.09305 15.5549 4.52506 15.3353 3.99514C15.1158 3.46532 14.7941 2.98394 14.3885 2.57847C13.983 2.17277 13.5015 1.85094 12.9716 1.63137C12.4416 1.4118 11.8737 1.29878 11.3 1.29878Z'
                  : 'M9.62852 1.63137C10.1584 1.4118 10.7264 1.29878 11.3 1.29878C11.8737 1.29878 12.4416 1.4118 12.9716 1.63137C13.5015 1.85094 13.983 2.17277 14.3885 2.57847C14.7941 2.98394 15.1158 3.46532 15.3353 3.99514C15.5549 4.52506 15.6679 5.09305 15.6679 5.66667C15.6679 6.24028 15.5549 6.80827 15.3353 7.33819C15.1158 7.86806 14.794 8.34949 14.3884 8.75497C14.3883 8.75501 14.3884 8.75493 14.3884 8.75497L8.49502 14.6483C8.22165 14.9217 7.77844 14.9217 7.50507 14.6483L1.61174 8.75497C0.792668 7.9359 0.33252 6.82501 0.33252 5.66667C0.33252 4.50833 0.792668 3.39743 1.61174 2.57836C2.43081 1.75929 3.54171 1.29914 4.70005 1.29914C5.85839 1.29914 6.96928 1.75929 7.78835 2.57836L8.00005 2.79005L8.21162 2.57847C8.21158 2.57851 8.21166 2.57844 8.21162 2.57847C8.61711 2.17283 9.09865 1.85092 9.62852 1.63137ZM13.3983 3.56819C13.1228 3.29256 12.7957 3.07392 12.4357 2.92474C12.0756 2.77556 11.6898 2.69878 11.3 2.69878C10.9103 2.69878 10.5245 2.77556 10.1644 2.92474C9.80441 3.07392 9.4773 3.29256 9.2018 3.56819L8.49502 4.27497C8.22165 4.54834 7.77844 4.54834 7.50507 4.27497L6.7984 3.56831C6.24189 3.01179 5.48708 2.69914 4.70005 2.69914C3.91301 2.69914 3.15821 3.01179 2.60169 3.56831C2.04517 4.12483 1.73252 4.87963 1.73252 5.66667C1.73252 6.4537 2.04517 7.20851 2.60169 7.76502L8.00005 13.1634L13.3984 7.76502C13.674 7.48953 13.8928 7.16231 14.042 6.80228C14.1911 6.44226 14.2679 6.05637 14.2679 5.66667C14.2679 5.27696 14.1911 4.89107 14.042 4.53105C13.8928 4.17103 13.6739 3.84369 13.3983 3.56819Z'
              }
            />
          </svg>
        </button>
      </div>
      <ul className={styles.productInfo}>
        <li className={styles.productInfoItem}>
          <span>{t('specs.screen')}</span>
          <span>{formattedScreen}</span>
        </li>
        <li className={styles.productInfoItem}>
          <span>{t('specs.resolution')}</span>
          <span>{resolution}</span>
        </li>
        <li className={styles.productInfoItem}>
          <span>{t('specs.processor')}</span>
          <span>{processor}</span>
        </li>
        <li className={styles.productInfoItem}>
          <span>{t('specs.ram')}</span>
          <span>{formattedRam}</span>
        </li>
      </ul>
    </div>
  );
};
