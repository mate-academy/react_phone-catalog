import { Link } from 'react-router-dom';
import { CartItem } from './CartItem';
import { useContext, useState } from 'react';
import { DispatchContext, StateContext } from '../../context/ItemProvider';
import { ErrorMessage } from '../Shared/ErrorMessage';
import { Modal } from '../Shared/Modal/Modal';
import { getProductDetails } from '../../utils/productUtils';

export const Cart = () => {
  const { cart, totalCount } = useContext(StateContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const totalPrice = cart.reduce((sum, item) => {
    const { price } = getProductDetails(item.product);

    return sum + price * item.quantity;
  }, 0);
  const isEmpty = cart.length === 0;

  const dispatch = useContext(DispatchContext);

  return (
    <main className="main">
      <ErrorMessage />
      <div className="container">
        <div className="main__content">
          <div className="cart">
            <div className="cart__top">
              <Link to=".." className="item-card__back">
                <img
                  src="./img/buttons/ButtonVectorLeft.svg"
                  alt="VectorBack"
                />
                <span className="item-card__back-text">Back</span>
              </Link>
            </div>
            <h1 className="cart__title">Cart</h1>
            <div className="cart__items">
              {cart.length === 0 ? (
                <>
                  <h3 className="cart__empty">Your cart is empty</h3>
                </>
              ) : (
                <>
                  {cart.map(item => (
                    <CartItem key={item.product.id} item={item} />
                  ))}
                  <div className="total cart__total">
                    <div className="total__content">
                      <h2>${totalPrice}</h2>
                      <span>Total for {totalCount} items</span>
                    </div>
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className={`total__button ${isEmpty ? 'total__button' : ''}`}
                      disabled={isEmpty}
                    >
                      Checkout
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Checkout"
      >
        <p>Checkout is not implemented yet. Do you want to clear the Cart?</p>
        <div className="moda__actions">
          <button
            className="modal__close"
            type="button"
            onClick={() => {
              setIsModalOpen(false);
              dispatch({ type: 'CLEAR_CART' });
            }}
          >
            Confirm order
          </button>
          <button
            className="modal__close"
            type="button"
            onClick={() => setIsModalOpen(false)}
          >
            Cancel
          </button>
        </div>
      </Modal>
    </main>
  );
};
