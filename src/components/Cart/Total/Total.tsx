import { useContext, useState } from 'react';
import './Total.scss';
import { ProductsContext } from '../../../context/ProductContext';

type Props = {
  sumOfPrice: number;
  countProduct: number;
};

export const Total: React.FC<Props> = ({ sumOfPrice, countProduct }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { onClearCart } = useContext(ProductsContext);

  const handleCheckoutClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirm = () => {
    onClearCart();
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="cart__total">
      <h2 className="cart__total-sum">${sumOfPrice}</h2>
      <p className="cart__total-count">Total for {countProduct} items</p>
      <button
        className="cart__total-button"
        onClick={() => {
          handleCheckoutClick();
        }}
      >
        Checkout
      </button>
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <p>
              Checkout is not implemented yet. Do you want to clear the Cart?
            </p>
            <div className="modal-buttons">
              <button onClick={handleConfirm}>Yes, clear cart</button>
              <button onClick={handleCancel}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
