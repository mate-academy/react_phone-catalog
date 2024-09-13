import React from 'react';
import './Modal.scss';

interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const Modal: React.FC<ModalProps> = ({ isVisible, onClose, onConfirm }) => {
  if (!isVisible) return null;

  return (
    <div className="modal">
      <div className="modal__content">
        <p className="modal__message">
          Checkout is not implemented yet. Do you want to clear the Cart?
        </p>
        <div className="modal__buttons">
          <button className="modal__button" onClick={onConfirm}>Confirm</button>
          <button className="modal__button" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

