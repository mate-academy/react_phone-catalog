import React, { useContext } from 'react';
import { CatalogContext } from '../Contexts/CatalogContext';

type Props = {
  property: string;
};

export const Popup: React.FC<Props> = ({ property }) => {
  const { clearCart, setPopup } = useContext(CatalogContext);

  const handlerConfirmClearCart = () => {
    clearCart();
    setPopup('');
  };

  return (
    <div className="popup">
      <div className="popup-window">
        <div className="popup-title">
          <p className="popup-underline">Sorry!</p>
          {property === 'Cart' ? (
            <p>
              Checkout is not implemented yet. Do you want to clear the Cart?
            </p>
          ) : (
            <p>This feature is not implemented yet.</p>
          )}
        </div>
        <div className="popup__block-buttons">
          {property === 'Cart' ? (
            <>
              <button
                className="popup-button"
                onClick={handlerConfirmClearCart}
              >
                Confirm
              </button>
              <button className="popup-button" onClick={() => setPopup('')}>
                Cancel
              </button>
            </>
          ) : (
            <button className="popup-button" onClick={() => setPopup('')}>
              Ok
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
