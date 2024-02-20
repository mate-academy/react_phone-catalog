/* eslint-disable jsx-a11y/control-has-associated-label */
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartItem } from '../../components/CartItem';
import { CartContext } from '../../store/CartContext';
import { Modal } from '../../components/Modal';

import './CartPage.scss';

export const CartPage = () => {
  const { productsInCart, countOfProductsInCart } = useContext(CartContext);
  const [activeModal, setActiveModal] = useState(false);
  const navigate = useNavigate();

  const total = productsInCart
    .reduce((sum, item) => sum + (item.quantity * item.product.price), 0);
  const totalText = countOfProductsInCart === 1
    ? 'Total for 1 item'
    : `Total for ${countOfProductsInCart} items`;

  return (
    <div className="cart cart__content">
      <div className="cart__back">
        <button
          type="button"
          className="button-icon button-icon--arrow-left"
          onClick={() => navigate(-1)}
        />

        <button
          type="button"
          onClick={() => navigate(-1)}
          className="cart__back-button"
        >
          Back
        </button>
      </div>

      <h1 className="title title--pages cart__title">
        Cart
      </h1>

      {!countOfProductsInCart && (
        <h2>Your cart is empty</h2>
      )}

      {!!countOfProductsInCart && (
        <div className="cart__info">
          <div className="cart__list">
            {productsInCart.map(({ product }) => (
              <CartItem product={product} key={product.id} />
            ))}
          </div>

          <div className="cart__total">
            <p className="cart__total-price">
              {`$${total}`}
            </p>

            <p className="cart__total-text">
              {totalText}
            </p>

            <button
              type="button"
              className="cart__total-button"
              onClick={() => setActiveModal(true)}
            >
              Checkout
            </button>
          </div>
        </div>
      )}

      {activeModal && (
        <Modal active={activeModal} onClick={setActiveModal}>
          We are sorry, but this feature is not implemented yet
        </Modal>
      )}
    </div>
  );
};
