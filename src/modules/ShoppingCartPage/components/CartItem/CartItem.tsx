import React, { memo } from 'react';
import { ICON_DATA_PATHS } from '../../../../constants/iconDataPaths';
import cartItemStyles from './CartItem.module.scss';
import { IconButton } from '../../../../components/IconButton';
import classNames from 'classnames';
import { useCart } from '../../../../context/CartContext';
import { CartItemDetails } from '../../../../types/CartItemDetails';
import { CloseButton } from '../../../../components/CloseButton';
import { Link } from 'react-router-dom';

type Props = {
  className?: string;
  product: CartItemDetails;
};

export const CartItem: React.FC<Props> = memo(({ product, className }) => {
  const { itemId, category, image, name, totalPrice, quantity } = product;
  const { incrementQuantity, decrementQuantity, removeFromCart } = useCart();

  return (
    <article className={classNames(className, cartItemStyles.cartItem)}>
      <div className={cartItemStyles.cartItem__info}>
        <CloseButton onClose={() => removeFromCart(product.itemId)} />
        <Link
          to={`/${category}/${itemId}`}
          className={cartItemStyles.cartItem__link}
        >
          <img src={image} alt="" className={cartItemStyles.cartItem__image} />
          <h3 className={cartItemStyles.cartItem__title}>{name}</h3>
        </Link>
      </div>
      <div className={cartItemStyles.cartItem__actions}>
        <div className={cartItemStyles.cartItem__controls}>
          <IconButton
            iconDataPath={ICON_DATA_PATHS.MINUS}
            onClick={() => decrementQuantity(product.itemId)}
            className={cartItemStyles.cartItem__controlsButton}
            disabled={quantity === 1}
          />
          <span className={cartItemStyles.cartItem__itemQuantity}>
            {quantity}
          </span>
          <IconButton
            iconDataPath={ICON_DATA_PATHS.PLUS}
            onClick={() => incrementQuantity(product.itemId)}
            className={cartItemStyles.cartItem__controlsButton}
          />
        </div>
        <p className={cartItemStyles.cartItem__price}>${totalPrice}</p>
      </div>
    </article>
  );
});

CartItem.displayName = 'CartItem';
