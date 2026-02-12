import React from 'react';

import styles from './CartItem.module.scss';
import { AppButton } from '../../../shared/components/appButton';
import { CartItem as TypeCartItem } from '../../../../types/CartItem';
import { useAppDispatch } from '../../../../app/hooks';
import {
  decrementProductQuantity,
  deleteProduct,
  incrementProductQuantity,
} from '../../../../features/cartSlice/cart';
import { CloseSvg } from '../../../shared/svg/CloseSvg';
import { MinusSvg } from '../../../shared/svg/MinusSvg';
import { PlusSvg } from '../../../shared/svg/PlusSvg';
import { useLocation, useNavigate } from 'react-router-dom';

type Props = {
  cartItem: TypeCartItem;
};

export const CartItem: React.FC<Props> = ({ cartItem }) => {
  const { product, quantity } = cartItem;
  const dispatch = useAppDispatch();
  const { pathname, search } = useLocation();
  const navigate = useNavigate();

  const goToProductDetails = () => {
    navigate(`/${product.category}/${product.itemId}`, {
      state: pathname + search,
    });
  };

  return (
    <article className={styles.productItem}>
      <div className={styles.firstPart}>
        <AppButton
          buttonName="Remove item"
          className={styles.removeButton}
          onClick={() => dispatch(deleteProduct(cartItem))}
        >
          <CloseSvg color="var(--disable-arrow-svg)" />
        </AppButton>

        <img
          src={product.image}
          alt="Product photo"
          className={styles.productPhoto}
          onClick={() => goToProductDetails()}
        />

        <span
          className={styles.productName}
          onClick={() => goToProductDetails()}
        >
          {product.name}
        </span>
      </div>

      <div className={styles.secondPart}>
        <div className={styles.counterProductsContainer}>
          <AppButton
            disabled={quantity <= 1}
            buttonName="-"
            onClick={() => dispatch(decrementProductQuantity(cartItem))}
          >
            <MinusSvg color="var(--active-arrow-svg)" />
          </AppButton>
          <span>{quantity}</span>
          <AppButton
            buttonName="+"
            onClick={() => dispatch(incrementProductQuantity(cartItem))}
          >
            <PlusSvg color="var(--active-arrow-svg)" />
          </AppButton>
        </div>

        <span className={styles.price}>{'$' + product.price}</span>
      </div>
    </article>
  );
};
