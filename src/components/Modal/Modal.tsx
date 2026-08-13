import React, { useEffect, useState } from 'react';
import styles from './Modal.module.scss';
import { useApp } from '../../context/AppContext';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const Modal: React.FC<Props> = ({ isOpen, onClose, onConfirm }) => {
  const { language } = useApp();

  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setIsSuccess(false);
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleConfirmClick = () => {
    setIsSuccess(true);

    setTimeout(() => {
      onConfirm();
    }, 2000);
  };

  return (
    <div className={styles.modal} onClick={isSuccess ? undefined : onClose}>
      <div className={styles.modal__content} onClick={e => e.stopPropagation()}>
        {isSuccess ? (
          <div className={styles.modal__successAnimation}>
            <p className={styles.modal__text}>
              {language === 'eng'
                ? 'Thank you for your order! '
                : 'Дякуємо за замовлення! '}
            </p>

            <span style={{ fontSize: '40px' }}>🎉</span>
          </div>
        ) : (
          <>
            <p className={styles.modal__text}>
              {language === 'eng'
                ? 'Checkout is not implemented yet. Do you want to clear the Cart?'
                : 'Оформлення замовлення ще не реалізовано. Бажаєте очистити Кошик?'}
            </p>

            <div className={styles.modal__actions}>
              <button
                type="button"
                className={styles.modal__btn}
                onClick={handleConfirmClick}
              >
                {language === 'eng' ? 'Confirm' : 'Підтвердити'}
              </button>

              <button
                type="button"
                className={`${styles.modal__btn} ${styles['modal__btn--cancel']}`}
                onClick={onClose}
              >
                {language === 'eng' ? 'Cancel' : 'Скасувати'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
