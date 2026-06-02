/* eslint-disable import/extensions */
/* eslint-disable prettier/prettier */

import { useCart } from '@/modules/shared/utils/context/CartContext';

import styles from './CartTotal.module.scss';

const {
  cartTotal,
  cartTotalPrice,
  cartTotalCount,
  cartCheckoutBtn,
} = styles;

export const CartTotal = () => {
  const { totalPrice, totalCount } = useCart();

  return (
    <div className={cartTotal}>
      <p className={cartTotalPrice}>
        {`$${totalPrice}`}
      </p>

      <p className={cartTotalCount}>
        {`Total for ${totalCount} ${totalCount > 1 ? 'items' : 'item'}`}
      </p>

      <button
        className={cartCheckoutBtn}
        type="button"
        onClick={() => { }}
      >
        Checkout
      </button>
    </div>
  );
};

