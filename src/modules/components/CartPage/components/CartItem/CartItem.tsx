/* eslint-disable import/extensions */
/* eslint-disable prettier/prettier */

//#region IMPORTS
import { useCart } from '@/modules/shared/utils/context/CartContext';
import { useTranslation } from 'react-i18next';

import { Button } from '@/modules/shared/components/ui/Button';
import { CartItemType } from '@/modules/shared/utils/types';

import RemoveIcon from '@/assets/svg/remove.svg?react';

import styles from './CartItem.module.scss';
//#endregion

//#region STYLES
const {
  cartItem,

  itemMain,
  removeBtn,
  removeIcon,
  productImage,
  productName,

  itemControls,
  quantityControls,
  quantityBtn,
  quantityNumber,
  productPrice,
} = styles;
//#endregion

interface Props {
  cart: CartItemType;
}

export const CartItem: React.FC<Props> = ({ cart }) => {
  //#region DATA_FETCHING
  const { removeCart, updateQuantity } = useCart();
  const { t } = useTranslation();
  //#endregion

  //#region RENDER
  return (
    <div className={cartItem}>
      <div className={itemMain}>
        <button
          className={removeBtn}
          type="button"
          onClick={() => removeCart(cart.product.itemId)}
          aria-label={t('cart.item.aria.removeBtn')}
        >
          <RemoveIcon
            className={removeIcon}
            aria-label={t('cart.item.alt.removeIcon')}
          />
        </button>

        <img
          className={productImage}
          src={`${import.meta.env.BASE_URL}/${cart.product.image}`}
          alt={t('cart.item.alt.productImage', { name: cart.product.name })}
        />

        <p className={productName}>{cart.product.name}</p>
      </div>

      <div className={itemControls}>
        <div className={quantityControls}>
          <Button
            variant="icon"
            className={quantityBtn}
            onClick={() => updateQuantity(cart.product.itemId, 'decrement')}
            disabled={cart.quantity <= 1}
            aria-label={t('cart.item.aria.quantityDecreaseBtn')}
          >
            -
          </Button>

          <p className={quantityNumber}>{cart.quantity}</p>

          <Button
            variant="icon"
            className={quantityBtn}
            onClick={() => updateQuantity(cart.product.itemId, 'increment')}
            aria-label={t('cart.item.aria.quantityIncreaseBtn')}
          >
            +
          </Button>
        </div>

        <p className={productPrice}>{`$${cart.product.price}`}</p>
      </div>
    </div>
  );
  //#endregion
};
