import React from 'react';
import { Link } from 'react-router-dom';
import styles from './SuccessModal.module.scss';
import Modal from '../Modal/Modal';
import { CheckIcon } from '../icons/CheckIcon';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

const SuccessModal: React.FC<SuccessModalProps> = ({
  isOpen,
  onClose,
  message,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Item adicionado!">
      <div className={styles.successContent}>
        <div className={styles.iconContainer}>
          <CheckIcon className={styles.checkIcon} />
        </div>
        <p className={styles.message}>{message}</p>
        <div className={styles.buttons}>
          <Link to="/cart" className={styles.viewCartButton} onClick={onClose}>
            Ver Carrinho
          </Link>
          <button className={styles.continueButton} onClick={onClose}>
            Continuar Comprando
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default SuccessModal;
