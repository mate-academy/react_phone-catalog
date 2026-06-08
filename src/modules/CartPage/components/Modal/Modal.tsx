import React from 'react';
import styles from './Modal.module.scss';
import { createPortal } from 'react-dom';

type Props = {
  isModalOpen: boolean;
  setIsModelOpen: (isOpen: boolean) => void;
  children: React.ReactNode;
};

export const Modal = ({ isModalOpen, setIsModelOpen, children }: Props) => {
  if (!isModalOpen) {
    return null;
  }

  const handleClose = () => {
    setIsModelOpen(false);
  };

  return createPortal(
    <div onClick={handleClose} className={styles.overlay}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <button onClick={handleClose} className={styles.closeBtn}>
          <img src="/icons/close.svg" alt="close" />
        </button>
        {children}
      </div>
    </div>,
    document.body,
  );
};
