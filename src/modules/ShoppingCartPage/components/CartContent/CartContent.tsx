//#region imports
import { FC } from 'react';
import { CartList } from '../CartList';
import { Total } from '../Total';
import { CartItem } from '../../../shared/types/CartItem';
import { useTranslation } from 'react-i18next';
import baseStyles from './base.module.scss';
import styles from './CartContent.module.scss';
//#endregion

type Props = {
  cartItems: CartItem[];
};

export const CartContent: FC<Props> = ({ cartItems }) => {
  const { t } = useTranslation('cart');

  return (
    <div className={`${baseStyles.cart} ${styles.cart}`}>
      <h1>{t('cart')}</h1>

      <div className={baseStyles.main}>
        <div className={baseStyles.cartList}>
          <CartList cartItems={cartItems} />
        </div>

        <div className={baseStyles.total}>
          <Total cartItems={cartItems} />
        </div>
      </div>
    </div>
  );
};
