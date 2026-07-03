//#region imports
import { Checkout } from '../Checkout';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../../../store/hooks';
import {
  selectCartTotal,
  selectTotalQuantity,
} from '../../../../store/selectors/cart';
import { capitalizeFirstWord } from '../../../../services/capitalizeFirstWord';
import baseStyles from './base.module.scss';
import styles from './Total.module.scss';
//#endregion

export const Total = () => {
  const { t } = useTranslation('cart');
  const totalQuantity = useAppSelector(selectTotalQuantity);
  const totalCost = useAppSelector(selectCartTotal);

  return (
    <div className={baseStyles.total}>
      <div className={baseStyles.priceBox}>
        <span className={styles.totalCost} aria-live="polite">
          {`$${totalCost}`}
        </span>

        <div className={styles.totalItems} aria-live="polite">
          {capitalizeFirstWord(t('totalForItems', { count: totalQuantity }))}
        </div>
      </div>

      <Checkout />
    </div>
  );
};
