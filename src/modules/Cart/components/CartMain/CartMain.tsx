import { useTranslation } from 'react-i18next';
import { CheckoutSkeleton } from '../../../../shared/UI/Skeletons/CheckoutSkeleton';
import { Loader } from '../../../shared/components/Loader';
import { useCartProducts } from '../../hooks/useCartProducts';
import { CartCheckout } from '../CartCheckout';
import { CartList } from '../CartList';
import styles from './CartMain.module.scss';

export const CartMain = () => {
  const { t } = useTranslation();
  const { cartProducts, loading } = useCartProducts();
  return (
    <div className={styles.main}>
      {!loading && cartProducts.length <= 0 ? (
        <Loader
          classNames={styles.loader}
          status="empty"
          emptyMessage={t('ui.errors.cart_is_empty')}
        />
      ) : (
        <>
          <CartList loading={loading} products={cartProducts} />

          {loading ? (
            <CheckoutSkeleton />
          ) : (
            <CartCheckout products={cartProducts} />
          )}
        </>
      )}
    </div>
  );
};
