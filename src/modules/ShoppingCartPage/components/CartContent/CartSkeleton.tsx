//#region imports
import { useTranslation } from 'react-i18next';
import { SkeletonItem } from '../../../shared/components/SkeletonItem';
import { CartListSkeleton } from '../CartList';
import { TotalSkeleton } from '../Total';
import baseStyles from './base.module.scss';
import styles from './CartSkeleton.module.scss';
//#endregion

export const CartSkeleton = () => {
  const { t } = useTranslation('cart');

  return (
    <div
      className={baseStyles.cart}
      role="status"
      aria-busy="true"
      aria-label={t('loading')}
    >
      <SkeletonItem additionalClass={styles.title} />

      <div className={baseStyles.main}>
        <div className={baseStyles.cartList}>
          <CartListSkeleton />
        </div>

        <div className={baseStyles.total}>
          <TotalSkeleton />
        </div>
      </div>
    </div>
  );
};
