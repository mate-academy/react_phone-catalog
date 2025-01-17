import React from 'react';
import styles from './Modal.module.scss';
import { useTranslation } from 'react-i18next';

interface Props {
  onClose: () => void;
  onConfirm: () => void;
  isOpen: boolean;
}

export const Modal: React.FC<Props> = ({ onClose, onConfirm, isOpen }) => {
  const { t } = useTranslation();

  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 className={styles.modalTitle}>{t('modal.title')}</h2>
        <p className={styles.modalMessage}>{t('modal.message')}</p>
        <div className={styles.modalActions}>
          <button className={styles.cancelBtn} onClick={onClose}>
            {t('modal.cancelBtn')}
          </button>
          <button className={styles.confirmBtn} onClick={onConfirm}>
            {t('modal.confirmBtn')}
          </button>
        </div>
      </div>
    </div>
  );
};
