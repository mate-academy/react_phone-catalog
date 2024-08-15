import React from 'react';
import classNames from 'classnames';
import { BackButton } from '../BackButton';
import styles from './NoProductsFound.module.scss';

interface Props {
  title?: string;
  inShoppingCart?: boolean;
}

export const NoProductsFound: React.FC<Props> = ({
  title = 'Product was not found',
  inShoppingCart = false,
}) => {
  return (
    <div
      className={classNames(styles.noProducts, {
        [styles.emptyCart]: inShoppingCart,
      })}
    >
      <div
        className={classNames(styles.btnBack, {
          [styles.btnBackInCart]: inShoppingCart,
        })}
      >
        <BackButton />
      </div>

      <p className={styles.noProductsText}>{title}</p>
    </div>
  );
};
