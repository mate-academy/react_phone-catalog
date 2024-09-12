import React, { Dispatch, SetStateAction } from 'react';
import { useArrayContext } from '../../ArrayContext';

type Props = {
  setModal: Dispatch<SetStateAction<boolean>>;
};

export const Modal: React.FC<Props> = ({ setModal }) => {
  const { setCartProducts } = useArrayContext();

  return (
    <div className="modal">
      <div className="modal__content ">
        <div className="modal__text">
          <h3 className="h3">{`Sorry :(((`}</h3>
          <p className="body-text">
            Checkout is not implemented yet. Do you want to clear the Cart?
          </p>
        </div>
        <div className="modal__buttons">
          <button
            className="button modal__button-close"
            onClick={() => setModal(false)}
          >
            Close
          </button>
          <button
            className="button modal__button-clear"
            onClick={() => {
              setModal(false);
              setCartProducts([]);
            }}
          >
            Clear cart
          </button>
        </div>
      </div>
    </div>
  );
};
