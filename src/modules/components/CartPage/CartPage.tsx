/* eslint-disable import/extensions */
/* eslint-disable prettier/prettier */

//#region IMPORTS
import { useCart } from '@/modules/shared/utils/context/CartContext';

import { CartItem } from './components/CartItem';
import { CartTotal } from './components/CartTotal';
import { BackButton } from '@/modules/shared/components/ui/BackButton';

import styles from './CartPage.module.scss';
//#endregion

//#region STYLES
const {
  cartPage,
  cartTitle,
  cartContent,
  itemList,
  emptyMessage,
} = styles;
//#endregion

export const CartPage = () => {
  //#region DATA_FETCHING
  const { cart } = useCart();
  //#endregion

  //#region RENDER
  return (
    <div className={cartPage}>
      <BackButton />

      <h1 className={cartTitle}>Cart</h1>

      {cart.length === 0 ? (
        <p className={emptyMessage}>Your cart is empty</p>
      ) : (
        <div className={cartContent}>
          <div className={itemList}>
            {cart.map(item => (
              <CartItem key={item.product.id} cart={item} />
            ))}
          </div>

          <CartTotal />
        </div>
      )}

    </div>
  );
  //#endregion
};
