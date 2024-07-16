import React from 'react';
import ReactDOM from 'react-dom';
import './Modal.scss';
import { useDispatch } from 'react-redux';
import { clearCart } from '../../features/cart';

type Props = {
  onClose: () => void;
};

export const Modal: React.FC<Props> = ({ onClose }) => {
  const dispatch = useDispatch();
  const portalRoot = document.getElementById('portal-root');

  if (!portalRoot) {
    // eslint-disable-next-line no-console
    console.error('Portal root not found');

    return null;
  }

  const handleClearCart = () => {
    dispatch(clearCart());
    onClose();
  };

  return ReactDOM.createPortal(
    <div className="modal">
      <button className="modal__close" onClick={onClose}>
        <svg className="icon icon-close-modal">
          <use href="img/icons.svg#icon-close"></use>
        </svg>
      </button>
      <div className="modal__content">
        <p className="modal__content--text">
          Checkout is not implemented yet. Do you want to clear the Cart?
        </p>
        <div className="modal__content--box modal-box">
          <button onClick={handleClearCart} className="modal-box__button">
            Yes
          </button>
          <button onClick={onClose} className="modal-box__button">
            Cancel
          </button>
        </div>
      </div>
    </div>,
    portalRoot,
  );
};
