import { useState } from 'react';
import cross from '../../Icons/closeBlack.svg';
import './CheckoutModal.scss';

export const CheckoutModal = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      {isOpen && (
        <div className="modal">
          <div className="modal__wrapper">
            <button
              type="button"
              className="modal__button"
              onClick={() => setIsOpen(false)}
            >
              <img src={cross} alt="cross" className="modal__image" />
            </button>
          </div>

          <h1 className="modal__title">
            We are sorry, but this feature is not implemented yet
          </h1>
        </div>
      )}
    </>
  );
};
