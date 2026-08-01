import { useEffect } from 'react';
import { useTranslation } from '@shared/context';
import styles from './CheckoutModal.module.scss';

interface Props {
  onConfirm: () => void;
  onCancel: () => void;
}

export const CheckoutModal: React.FC<Props> = ({ onConfirm, onCancel }) => {
  const { t } = useTranslation();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onCancel();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onCancel]);

  return (
    <div
      className={styles.overlay}
      role="presentation"
      onClick={event => {
        if (event.target === event.currentTarget) {
          onCancel();
        }
      }}
    >
      <div
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="checkout-modal-text"
      >
        <p id="checkout-modal-text" className={styles.text}>
          {t('cart.modalText')}
        </p>

        <div className={styles.buttons}>
          <button type="button" className={styles.cancel} onClick={onCancel}>
            {t('cart.cancel')}
          </button>

          <button
            type="button"
            className={styles.confirm}
            autoFocus
            onClick={onConfirm}
          >
            {t('cart.confirm')}
          </button>
        </div>
      </div>
    </div>
  );
};
