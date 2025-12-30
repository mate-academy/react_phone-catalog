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
  Header: FC<{
    title: string;
    withIcon?: boolean;
    icon?: ReactNode;
    className?: string;
  }>;
  Body: FC<{ children: ReactNode }>;
  Footer: FC<{
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

Modal.Header = function ModalHeader({ title, icon, withIcon, className }) {
  return (
    <div className={classNames(styles.header, className)}>
      {withIcon && icon}
      <h2 className={styles.title}>{title}</h2>
    </div>
  );
};

Modal.Body = function ModalBody({ children }) {
  return <div>{children}</div>;
};

Modal.Footer = function ModalFooter({ onCancel, onSubmit }) {
  return (
    <div className={styles.footer}>
      <Button
        variant="outline"
        className={classNames(styles.footerBtn, styles.cancelBtn)}
        onClick={onCancel}
      >
        Cancel
      </Button>
      <Button
        variant="primary"
        className={classNames(styles.footerBtn, styles.confirmBtn)}
        onClick={onSubmit}
      >
        Confirm
      </Button>
    </div>
  );
};
