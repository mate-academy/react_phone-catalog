/* eslint-disable import/extensions */
/* eslint-disable prettier/prettier */

//#region IMPORTS
import { useCart } from '@/modules/shared/utils/context/CartContext';

import { Button } from '@/modules/shared/components/ui/Button';
import { CartItemType } from '@/modules/shared/utils/types';

import removeIcon from '@/assets/svg/remove.svg';

import styles from './CartItem.module.scss';
//#endregion

//#region STYLES
const {
  cartItem,

  itemMain,
  removeBtn,
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
  //#endregion

  //#region RENDER
  return (
    <div className={cartItem}>
      <div className={itemMain}>
        <button
          className={removeBtn}
          type="button"
          onClick={() => removeCart(cart.product.itemId)}
          aria-label="Delete product from cart"
        >
          <img src={removeIcon} alt="Remove product from cart" />
        </button>

        <img
          className={productImage}
          src={cart.product.image}
          alt={`Product image of ${cart.product.name}`}
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
            aria-label="Decrease quantity"
          >
            -
          </Button>

          <p className={quantityNumber}>{cart.quantity}</p>

          <Button
            variant="icon"
            className={quantityBtn}
            onClick={() => updateQuantity(cart.product.itemId, 'increment')}
            aria-label="Increase quantity"
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
