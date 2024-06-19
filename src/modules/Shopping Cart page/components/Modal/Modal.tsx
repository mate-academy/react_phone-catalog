import React from 'react';
import ReactDOM from 'react-dom';
import './Modal.scss';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { deleteAllCart } from '../../../../features/User/userSlice';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const { cart } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();

  if (!isOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal__top">
          <h2 className="modal__title">Checkout</h2>
          <button className="modal-close" onClick={onClose}>
            <img src="../../../img/cart/close.svg" alt="close" />
          </button>
        </div>
        <p className="modal__text">
          Checkout is not implemented yet. Do you want to clear the Cart?
        </p>
        <div className="modal__buttons">
          <button onClick={onClose}>Cancel</button>
          <button onClick={() => dispatch(deleteAllCart(cart))}>
            Clear Cart
          </button>
        </div>
      </div>
    </div>,
    document.getElementById('modal-root') as HTMLElement,
  );
};

export default Modal;
