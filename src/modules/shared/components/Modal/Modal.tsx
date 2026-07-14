import { createPortal } from 'react-dom';
import styles from './Modal.module.scss';
import classNames from 'classnames';
import { SquareButton } from '../SquareButton';
import { useEffect } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
}

export const Modal: React.FC<Props> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
}) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <h3 className={styles.modal__title}>{title}</h3>

        <div className={styles.modal__actions}>
          <SquareButton
            className={classNames(
              styles.modal__button,
              styles['modal__button--cancel'],
            )}
            onClick={onClose}
          >
            Cancel
          </SquareButton>

          <SquareButton
            className={classNames(
              styles.modal__button,
              styles['modal__button--confirm'],
            )}
            onClick={onConfirm}
          >
            Confirm
          </SquareButton>
        </div>
      </div>
    </div>,
    document.body,
  );
};
