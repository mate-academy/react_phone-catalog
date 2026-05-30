import React from 'react';
import styles from './Modal.module.scss';
import classNames from 'classnames';

type Props = {
  onCloseModal: (v: boolean) => void;
  children: React.ReactNode;
  className?: string;
};

export const Modal = ({ children, onCloseModal, className }: Props) => {
  return (
    <>
      <div
        className={styles['modal-overlay']}
        onClick={() => onCloseModal(false)}
      ></div>
      <div className={classNames([styles.modal], className)}>{children}</div>
    </>
  );
};
