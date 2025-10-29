import React from 'react';
import styles from './PaymentsButtons.module.scss';
import { Button } from '../Button';
import { ButtonType } from '../../types/ButtonType';
import classNames from 'classnames';
import { useSaveProducts } from '../../context/SaveProductsContext';
import { Product } from '../../types/ProductType';

export const PaymentsButtons = ({
  isPage = false,
  product,
}: {
  isPage?: boolean;
  product: Product['id'];
}) => {
  const { isFavorite, toggleFavorites, isCart, toggleCart } = useSaveProducts();
  const isActiveCart = isCart(product);

  return (
    <div
      className={classNames(styles.payments__buttons, {
        [styles.page]: isPage,
      })}
    >
      <Button
        isSelected={isActiveCart}
        className={`button-text ${styles['payments__buttons-add']}`}
        onClick={() => toggleCart(product)}
      >
        {isActiveCart ? 'Added to cart' : 'Add to cart'}
      </Button>

      <Button
        isRatio={true}
        icon={ButtonType.Heart}
        isFavorite={true}
        iconActive={ButtonType.HeartFilled}
        isSelected={isFavorite(product)}
        onClick={() => toggleFavorites(product)}
      />
    </div>
  );
};
