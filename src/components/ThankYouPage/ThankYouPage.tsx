import type { FC } from 'react';
import styles from './ThankYouPage.module.scss';

interface ThankYouPageProps {
  isOpen: boolean;
  onClose: () => void;
  orderId: number;
}

export const ThankYouPage: FC<ThankYouPageProps> = ({
  isOpen,
  onClose,
  orderId,
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className={styles.modalOverlay}
      onClick={onClose}
    >
      <div
        className={styles.modalContent}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className={styles.title}>Thank you for order!</h2>
        <p className={styles.orderId}>
          Your order ID is: <strong>#{orderId}</strong>
        </p>
      </div>
    </div>
  );
};
