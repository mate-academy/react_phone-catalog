import React from 'react';
import './Modal.scss';
import classNames from 'classnames';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export const Modal: React.FC<Props> = ({ isOpen, onClose, children }) => {
  return (
    <div className={classNames('modal', { 'modal--open': isOpen })}>
      d<div className="modal__overlay" onClick={onClose}></div>
      <div className="modal__content">
        <button className="modal__close-button" onClick={onClose}>
          X
        </button>
        {children}
      </div>
    </div>
  );
};
