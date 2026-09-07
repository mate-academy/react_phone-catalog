import React from 'react';
import style from './Modal.module.scss';
import classNames from 'classnames';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal: React.FC<Props> = ({ isOpen, onClose, children }) => {
  return (
    <div
      className={classNames(style.modal, {
        [style.modal_open]: isOpen,
      })}
    >
      <div className={style.modal_overlay} onClick={onClose}></div>
      <div className={style.modal_content}>
        <button className={style.modal_close} onClick={onClose}>
          X
        </button>
        {children}
      </div>
    </div>
  );
};
