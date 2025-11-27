import { ReactNode, useEffect } from 'react';
import scss from './Modal.module.scss';
import { createPortal } from 'react-dom';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const Modal: React.FC<Props> = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const modalRoot = document.getElementById('modal-root');

  if (!modalRoot) {
    return null;
  }

  return createPortal(
    <div
      className={scss.modal}
      onClick={onClose}
      role="dialog"
      aria-modal={true}
    >
      <div className={scss.modal__content} onClick={e => e.stopPropagation()}>
        <button className={scss.modal__close} onClick={onClose}>
          <svg className={scss.modal__closeIcon}>
            <use href="/icons/icons.svg#close-icon"></use>
          </svg>
        </button>

        {children}
      </div>
    </div>,
    modalRoot,
  );
};
