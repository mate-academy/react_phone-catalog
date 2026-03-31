import { useTranslation } from 'react-i18next';
import { CartItem } from '@/store/productStore';
import styles from './CartSummary.module.scss';
import { Button } from '@/components/ui/Button';
import { useState } from 'react';
import { CheckoutPopup } from '@/features/cart/components/CheckoutPopup';

interface CartSummaryProps {
  items: CartItem[];
}

export const CartSummary = ({ items }: CartSummaryProps) => {
  const { t } = useTranslation();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <div className={styles.summary}>
        <p className={styles.total}>${total}</p>
        <p className={styles.label}>
          {t('cart.totalFor', { count: totalItems })}
        </p>
        <div className={styles.divider} />
        <Button
          className={styles.checkoutBtn}
          onClick={() => setIsPopupOpen(true)}
        >
          {t('cart.checkout')}
        </Button>
      </div>

      <CheckoutPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
      />
    </>
  );
};
