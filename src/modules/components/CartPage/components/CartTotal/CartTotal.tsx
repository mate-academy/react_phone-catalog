/* eslint-disable import/extensions */
/* eslint-disable prettier/prettier */

//#region IMPORTS
import { useCart } from '@/modules/shared/utils/context/CartContext';

import styles from './CartTotal.module.scss';
import { Button } from '@/modules/shared/components/ui/Button';
//#endregion

//#region STYLES
const {
  cartTotal,
  cartTotalPrice,
  cartTotalCount,
  cartCheckoutBtn,
} = styles;
//#endregion

export const CartTotal = () => {
  //#region DATA_FETCHING
  const { totalPrice, totalCount } = useCart();
  //#endregion

  //#region RENDER
  return (
    <div className={cartTotal}>
      <p className={cartTotalPrice}>
        {`$${totalPrice}`}
      </p>

      <p className={cartTotalCount}>
        {`Total for ${totalCount} ${totalCount > 1 ? 'items' : 'item'}`}
      </p>

      <Button
        variant="primary"
        className={cartCheckoutBtn}
        onClick={() => { }}
      >
        Checkout
      </Button>
    </div>
  );
  //#endregion
};

