import { createPortal } from 'react-dom';
import styles from './Modal.module.scss';
import { FC, ReactNode } from 'react';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import classNames from 'classnames';
import { Button } from '@/modules/shared/components/Button';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
  children: ReactNode;
}

interface ModalComponent extends FC<Props> {
  Body: FC<{ children: ReactNode; className?: string }>;
  Actions: FC<{
    onCancel: () => void;
    onSubmit: () => void;
  }>;
}

export const Modal: ModalComponent = ({
  isOpen,
  onClose,
  className,
  children,
}) => {
  const ref = useOutsideClick<HTMLDivElement>(onClose);

  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div className={styles.wrapper}>
      <div className={styles.overlay}></div>
      <div className={classNames(styles.modal, className)} ref={ref}>
        {children}
      </div>
    </div>,
    document.body,
  );
};

Modal.Body = function ModalBody({ children, className }) {
  return <div className={className}>{children}</div>;
};

Modal.Actions = function ModalActions({ onCancel, onSubmit }) {
  return (
    <div className={styles.actions}>
      <Button
        variant="outline"
        className={classNames(styles.actionsBtn, styles.cancelBtn)}
        onClick={onCancel}
      >
        Cancel
      </Button>
      <Button
        variant="primary"
        className={classNames(styles.actionsBtn, styles.confirmBtn)}
        onClick={onSubmit}
      >
        Confirm
      </Button>
    </div>
  );
};
