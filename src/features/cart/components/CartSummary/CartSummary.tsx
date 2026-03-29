import { useTranslation } from 'react-i18next';
import { CartItem } from '@/store/productStore';
import styles from './CartSummary.module.scss';

interface CartSummaryProps {
  items: CartItem[];
  onCheckout: () => void;
}

export const CartSummary = ({ items, onCheckout }: CartSummaryProps) => {
  const { t } = useTranslation();

  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className={styles.summary}>
      <p className={styles.total}>${total}</p>
      <p className={styles.label}>
        {t('cart.totalFor', { count: totalItems })}
      </p>
      <div className={styles.divider} />
      <button className={styles.checkoutBtn} onClick={onCheckout}>
        {t('cart.checkout')}
      </button>
    </div>
  );
};
