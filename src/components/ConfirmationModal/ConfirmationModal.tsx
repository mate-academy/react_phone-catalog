import React from 'react';
import styles from './ConfirmationModal.module.scss';
import Modal from '../Modal/Modal';

interface ConfirmationModalProps {
  isOpen: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  message,
  onConfirm,
  onCancel,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onCancel} title="Confirmação">
      <p className={styles.message}>{message}</p>
      <div className={styles.buttons}>
        <button className={styles.confirmButton} onClick={onConfirm}>
          Confirmar
        </button>
        <button className={styles.cancelButton} onClick={onCancel}>
          Cancelar
        </button>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
