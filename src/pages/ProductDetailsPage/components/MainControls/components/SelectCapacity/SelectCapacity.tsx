import React from 'react';
// eslint-disable-next-line max-len
import { AnyDetailedProduct } from '../../../../../../types/DetailedProductTypes';
// eslint-disable-next-line max-len
import { generateProductPageUrl } from '../../../../../../utils/productUrlGenerators';
import { NavLink } from 'react-router-dom';
import styles from './SelectCapacity.module.scss';
import classNames from 'classnames';

type Props = {
  product: AnyDetailedProduct;
};

export const SelectCapacity: React.FC<Props> = ({ product }) => {
  const {
    category,
    namespaceId,
    color: currentColor,
    capacity: currentCapacity,
    capacityAvailable,
  } = product;

  return (
    <div>
      <h3 className={styles['select-capacity__title']}>Select capacity</h3>

      <div className={styles['select-capacity__list']}>
        {capacityAvailable.map(capacityOption => {
          const isActive = capacityOption === currentCapacity;
          const url = generateProductPageUrl(
            category,
            namespaceId,
            capacityOption, // Змінюється ємність
            currentColor, // Колір залишається поточним
          );

          return (
            <NavLink
              key={capacityOption}
              to={url}
              className={classNames(styles['product-options__capacity-item'], {
                [styles['product-options__capacity-item--active']]: isActive,
              })}
            >
              {capacityOption}
            </NavLink>
          );
        })}
      </div>

      <div className={styles['select-capacity__divider']}></div>
    </div>
  );
};
