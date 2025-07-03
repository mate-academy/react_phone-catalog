import { clearCart } from '../../expansions/cart';
import { useAppDispatch } from '../../customHooks/customHooks';
import './Modal.scss';
import React from 'react';

type Props = {
  setIsOpen: (value: boolean) => void;
};

export const Modal: React.FC<Props> = ({ setIsOpen }) => {
  const dispatch = useAppDispatch();

  const handleReset = () => {
    dispatch(clearCart());
    setIsOpen(false);
  };

  return (
    <div className="modal">
      <div className="modal__content">
        <p className="modal__question">
          Checkout is not implemented yet. <br /> Do you want to clear the Cart?
        </p>
        <div className="modal__buttons">
          <button
            className="modal__button modal__buttons--clear"
            onClick={handleReset}
          >
            Confirm
          </button>
          <button
            className="modal__button modal__buttons--cancel"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
