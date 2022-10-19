import React, { useContext, useState } from 'react';
import { CartContext } from '../CartProvider';

export const CartTotal: React.FC = () => {
  const { totalAmount, totalQuantity } = useContext(CartContext);
  const [showMessage, setShowMessage] = useState(false);

  const handleShowMessage = () => {
    setShowMessage(true);

    setTimeout(() => {
      setShowMessage(false);
    }, 3000);
  };

  return (
    <div className="cartTotal">
      <div className="cartTotal__amount">{`$${totalAmount}`}</div>
      <div className="cartTotal__quantity">
        {`Total for ${totalQuantity} ${totalQuantity > 1 ? 'items' : 'item'}`}
      </div>
      <div className="cartTotal__line" />
      <button
        type="button"
        className="cartTotal__button"
        onClick={handleShowMessage}
      >
        Checkout
      </button>
      {showMessage && (
        <div className="cartTotal__message">
          We are sorry, but this feature is not implemented yet
        </div>
      )}
    </div>
  );
};
