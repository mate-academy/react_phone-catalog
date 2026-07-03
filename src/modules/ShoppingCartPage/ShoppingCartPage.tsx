// #region imports
import { BackButton } from '../shared/components/BackButton';
import { CartEmpty } from './components/CartEmpty/CartEmpty';
import { CartContent } from './components/CartContent/CartContent';
import { CartSkeleton } from './components/CartContent/CartSkeleton';
import { useAppSelector } from '../../store/hooks';
import { useLoading } from '../shared/hooks/useLoading';
import { useTranslation } from 'react-i18next';
import styles from './ShoppingCartPage.module.scss';
// #endregion

export const ShoppingCartPage = () => {
  const { t } = useTranslation('cart');
  const cart = useAppSelector(state => state.cart);

  const isLoading = useLoading();

  return (
    <section className={styles.cart} aria-label={t('cart')}>
      <div className={styles.backButton}>
        <BackButton />
      </div>

      {isLoading && <CartSkeleton />}

      {!isLoading && cart.length === 0 && <CartEmpty />}

      {!isLoading && cart.length > 0 && <CartContent cartItems={cart} />}
    </section>
  );
};
