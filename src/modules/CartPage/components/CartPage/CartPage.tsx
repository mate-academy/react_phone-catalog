import { useCart } from '../../../shared/components/Contexts/CartContext';
// eslint-disable-next-line max-len
import { useLanguage } from '../../../shared/components/Contexts/LanguageContext';
import { PathNavigation } from '../../../shared/components/PathNavigation';
import { CartItemsList } from '../CartItemsList';
import { CartSummary } from '../CartSummary';
import { EmptyCart } from '../EmptyCart';
import styles from './CartPage.module.scss';

export const CartPage: React.FC = () => {
  const { cart } = useCart();
  const { cartTitle } = useLanguage().localeTexts;

  return (
    <>
      <PathNavigation goBack />

      <main className={styles.CartPage}>
        <h1 className={styles.Title}>{cartTitle}</h1>

        {cart.length ? (
          <>
            <CartItemsList className={styles.List} />
            <CartSummary className={styles.Summary} />
          </>
        ) : (
          <EmptyCart className={styles.EmptyCart} />
        )}
      </main>
    </>
  );
};
