import classNames from 'classnames';
import styles from './Modal.module.scss';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

interface Props {
  children: React.ReactNode;
  isOpen: boolean;
}

export const Modal = ({ children, isOpen }: Props) => {
  const handleTransitionEnd = () => {
    if (isOpen) {
      return;
    }

    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
  };

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const scrollWidth =
      window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${scrollWidth}px`;
  }, [isOpen]);

  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, []);

  return createPortal(
    <>
      <div
        className={classNames(styles.backdrop, { [styles.isOpen]: isOpen })}
      />
      <div
        className={classNames(styles.modal, { [styles.isOpen]: isOpen })}
        onTransitionEnd={handleTransitionEnd}
      >
        <div className={styles.modalContent}>{children}</div>
      </div>
    </>,
    document.body,
  );
};
