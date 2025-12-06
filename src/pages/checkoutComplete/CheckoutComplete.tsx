import { useLocation } from 'react-router-dom';
import styles from './checkoutComplete.module.scss';

const defaultMessage = 'Order completed';

export const CheckoutComplete = () => {
  const location = useLocation();

  const state = location.state as { message?: string; from?: string };

  const text = state.message
    ? `Your order id: ${state.message}`
    : defaultMessage;

  return (
    <main className={styles.container}>
      <h1 className={styles.h1}>Checkout completed!</h1>
      <span className={styles.complete}>{text}</span>
    </main>
  );
};
