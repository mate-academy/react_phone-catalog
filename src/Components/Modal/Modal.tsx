import React, { useContext } from 'react';
import './Modal.scss';
import { CartContext } from '../../context/CartContext';
import { useLoading } from '../../hooks/useLoading';
import { Loader } from '../Loader/Loader';

type Props = {
  onClose: () => void;
};

export const Modal: React.FC<Props> = ({ onClose }) => {
  const { setCartProducts } = useContext(CartContext);
  const isLoading = useLoading();

  const handleClearCart = () => {
    onClose();
    setCartProducts([]);
  };

  return (
    <div className="modal-background" onClick={onClose}>
      {isLoading && <Loader />}

      {!isLoading && (
        <div className="modal">
          <p className="modal__text">
            Checkout is not implemented yet.
            <br />
            Do you want to clear the Cart?
          </p>

          <div className="modal__block">
            <button className="modal__button" onClick={handleClearCart}>
              Clear the Cart
            </button>

            <button className="modal__button" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
