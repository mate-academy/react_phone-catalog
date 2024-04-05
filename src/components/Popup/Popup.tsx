import React, { useContext } from 'react';
import { CatalogContext } from '../Contexts/CatalogContext';

type Props = {
  text: string;
  okButton?: boolean;
  confirmButton?: boolean;
  cancelButton?: boolean;
};

export const Popup: React.FC<Props> = ({
  text,
  okButton = false,
  confirmButton = false,
  cancelButton = false,
}) => {
  const { clearCart, setPopup } = useContext(CatalogContext);

  const handlerConfirmClearCart = () => {
    clearCart();
    setPopup(false);
  };

  return (
    <div className="popup">
      <div className="popup-window">
        <div className="popup-title">
          <p className="popup-underline">Sorry!</p>
          <p>{text}</p>
        </div>
        <div className="popup__block-buttons">
          {confirmButton && (
            <button className="popup-button" onClick={handlerConfirmClearCart}>
              Confirm
            </button>
          )}

          {cancelButton && (
            <button className="popup-button" onClick={() => setPopup(false)}>
              Cancel
            </button>
          )}

          {okButton && (
            <button className="popup-button" onClick={() => setPopup(false)}>
              Ok
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
