//#region imports
import { FC, useMemo } from 'react';
import { Checkout } from '../Checkout';
import { CartItem } from '../../../shared/types/CartItem';
import { capitalizeFirstWord } from '../../../../services/capitalizeFirstWord';
import { useTranslation } from 'react-i18next';
import baseStyles from './base.module.scss';
import styles from './Total.module.scss';
//#endregion

type Props = {
  cartItems: CartItem[];
};

export const Total: FC<Props> = ({ cartItems }) => {
  const { t } = useTranslation('cart');

  const totalCost = useMemo(
    () =>
      cartItems.reduce(
        (total, cartItem) => total + cartItem.product.price * cartItem.quantity,
        0,
      ),
    [cartItems],
  );

  return (
    <div className={baseStyles.total}>
      <div className={baseStyles.priceBox}>
        <span className={styles.totalCost} aria-live="polite">
          {`$${totalCost}`}
        </span>

        <div className={styles.totalItems} aria-live="polite">
          {capitalizeFirstWord(t('totalForItems', { count: cartItems.length }))}
        </div>
      </div>

      <Checkout />
    </div>
  );
};
