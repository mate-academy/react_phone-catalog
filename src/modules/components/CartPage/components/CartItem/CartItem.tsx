/* eslint-disable import/extensions */
/* eslint-disable prettier/prettier */

import { CartItemType } from '@/modules/shared/utils/types';

import removeIcon from '@/assets/svg/remove.svg';

import styles from './CartItem.module.scss';
import { useCart } from '@/modules/shared/utils/context/CartContext';

const {
  itemCard,

  leftSection,
  removeBtn,
  productImage,
  productName,

  rightSection,
  quantityControls,
  quantityBtn,
  quantityBtnDisabled,
  quantityNumber,
  productPrice,
} = styles;

export const CartItem = ({ cart }: { cart: CartItemType }) => {
  const { removeCart, updateQuantity } = useCart();

  return (
    <div className={itemCard}>

      <div className={leftSection}>
        <button
          className={removeBtn}
          type="button"
          onClick={() => removeCart(cart.product.itemId)}
          aria-label="Delete product from cart"
        >
          <img
            src={removeIcon}
            alt="Remove product from cart"
          />
        </button>

        <img
          className={productImage}
          src={cart.product.image}
          alt="Product image"
        />

        <p className={productName}>
          {cart.product.name}
        </p>
      </div>

      <div className={rightSection}>
        <div className={quantityControls}>
          <button
            className={`
              ${quantityBtn}
              ${cart.quantity === 1 ? quantityBtnDisabled : ''}
            `}
            type="button"
            onClick={() => updateQuantity(cart.product.itemId ,'decrement')}
            disabled={cart.quantity <= 1}
          >
            -
          </button>

          <p className={quantityNumber}>
            {cart.quantity}
          </p>

          <button
            className={quantityBtn}
            type="button"
            onClick={() => updateQuantity(cart.product.itemId ,'increment')}
          >
            +
          </button>
        </div>

        <p className={productPrice}>
          {`$${cart.product.price}`}
        </p>
      </div>
    </div>
  );
};
