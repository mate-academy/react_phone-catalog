import { Modal } from '@/components/Modal';

import styles from './CartModal.module.scss';
import { BiError } from 'react-icons/bi';
import { FC } from 'react';

interface Props {
  isOpen: boolean;
  closeModal: () => void;
  onSubmit?: () => void;
  onCancel?: () => void;
}

export const CartModal: FC<Props> = ({
  closeModal,
  isOpen,
  onCancel = () => {},
  onSubmit = () => {},
}) => {
  const handleSubmit = () => {
    onSubmit();
    closeModal();
  };

  const handleCancel = () => {
    onCancel();
    closeModal();
  };

  return (
    <Modal isOpen={isOpen} onClose={closeModal} className={styles.modal}>
      <Modal.Header
        title="Attention"
        className={styles.modalHeader}
        icon={<BiError size={64} />}
        withIcon
      />
      <Modal.Body>
        <p className={styles.message}>
          Checkout is not implemented yet. Do you want to clear the Cart?
        </p>
      </Modal.Body>
      <Modal.Footer onSubmit={handleSubmit} onCancel={handleCancel} />
    </Modal>
  );
};
