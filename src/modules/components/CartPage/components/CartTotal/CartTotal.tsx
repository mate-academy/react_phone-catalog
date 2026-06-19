/* eslint-disable import/extensions */
/* eslint-disable prettier/prettier */

//#region IMPORTS
import { useCart } from '@/modules/shared/utils/context/CartContext';
import { useTranslation } from 'react-i18next';

import { Button } from '@/modules/shared/components/ui/Button';
import styles from './CartTotal.module.scss';
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
  const { totalPrice, totalCount, clearCart } = useCart();
  const { t } = useTranslation();

  //#endregion

  //#region HANDLERS
  const handleCheckout = () => {
    const isConfirmed = window.confirm(
      t('cart.total.confirmation'),
    );

    if (isConfirmed) {
      clearCart();
    }
  };
  //#endregion

  //#region RENDER
  return (
    <div className={cartTotal}>
      <p className={cartTotalPrice}>
        {`$${totalPrice}`}
      </p>

      <p className={cartTotalCount}>
        {t('cart.total.countSummary', { count: totalCount })}
      </p>

      <Button
        variant="primary"
        className={cartCheckoutBtn}
        onClick={handleCheckout}
      >
        {t('cart.total.checkoutBtn')}
      </Button>
    </div>
  );
  //#endregion
};

