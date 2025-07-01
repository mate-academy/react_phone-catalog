import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import styles from './Modal.module.scss';
import CloseIcon from '@/assets/icons/CloseIcon.svg?react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const modalRoot = document.getElementById('modal-root');

export const Modal: React.FC<Props> = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.body.classList.add('no-scroll');
      window.addEventListener('keydown', handleEscape);
    } else {
      document.body.classList.remove('no-scroll');
    }

    return () => {
      window.removeEventListener('keydown', handleEscape);
      document.body.classList.remove('no-scroll');
    };
  }, [isOpen, onClose]);

  if (!modalRoot) {
    return null;
  }

  return createPortal(
    <CSSTransition
      in={isOpen}
      timeout={300}
      classNames={{
        enter: styles.modalEnter,
        enterActive: styles.modalEnterActive,
        exit: styles.modalExit,
        exitActive: styles.modalExitActive,
      }}
      unmountOnExit
    >
      <div className={styles.modalOverlay} onClick={onClose}>
        <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
          <button
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close modal"
          >
            <CloseIcon />
          </button>
          {children}
        </div>
      </div>
    </CSSTransition>,
    modalRoot,
  );
};
