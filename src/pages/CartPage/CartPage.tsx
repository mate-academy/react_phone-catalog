import { useGlobalContext } from '../../context/GlobalContext';
import { Link } from 'react-router-dom';
import { getImagePath } from '../../utils/getImagePath';
import { BackButton } from '../../components/BackButton/BackButton';
import cartIsEmpty from '../../../public/img/cart-is-empty.png';
import remove from '../../images/icons/remove.svg';
import minus from '../../images/icons/minus.svg';
import plus from '../../images/icons/plus.svg';
import './CartPage.scss';
import { useState } from 'react';

export const CartPage: React.FC = () => {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity, setCart } =
    useGlobalContext();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCart([]);
  };

  return (
    <div className="cart container">
      <BackButton />
      <h2 className="cart__title">Cart</h2>

      {cart.length === 0 ? (
        <div className="cart__empty">
          <p className="cart__empty--string">Your cart is empty...</p>
          <img
            src={cartIsEmpty}
            alt="Cart is empty"
            className="cart__empty--image"
          />
        </div>
      ) : (
        <div className="cart__wrapper">
          <div className="cart__items">
            {cart.map(item => (
              <div key={item.itemId} className="cart__item">
                <div className="cart__item-top">
                  <button
                    className="cart__icon cart__icon--cancel"
                    onClick={() => removeFromCart(item.itemId)}
                  >
                    <img
                      src={remove}
                      className="cart__icon--img"
                      alt="Remove from cart"
                    />
                  </button>

                  <Link
                    to={`/${item.category}/${item.itemId}`}
                    className="cart__link"
                  >
                    <img
                      src={getImagePath(item.image)}
                      className="cart__product-image"
                      alt={item.name}
                    />
                  </Link>

                  <Link
                    to={`/${item.category}/${item.itemId}`}
                    className="cart__product-name"
                  >
                    {item.name}
                  </Link>
                </div>

                <div className="cart__item-bottom">
                  <div className="cart__controls">
                    <button
                      className="cart__item-bottom--button"
                      onClick={() => decreaseQuantity(item.itemId)}
                    >
                      <img src={minus} alt="Decrease" />
                    </button>

                    <span className="cart__item-bottom--quantity">
                      {item.quantity}
                    </span>

                    <button
                      className="cart__item-bottom--button"
                      onClick={() => increaseQuantity(item.itemId)}
                    >
                      <img src={plus} alt="Increase" />
                    </button>
                  </div>

                  <span className="cart__price">
                    ${item.price * item.quantity}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="cart__checkout">
            <div className="cart__total-price">${totalPrice}</div>
            <div className="cart__total-amount">
              Total for {totalCount} items
            </div>
            <button className="cart__checkout-button" onClick={handleCheckout}>
              Checkout
            </button>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="cart__modal-overlay" onClick={handleCloseModal}>
          <div className="cart__modal" onClick={e => e.stopPropagation()}>
            <h3 className="cart__modal-title">Thank you for your order!</h3>
            <p className="cart__modal-text">
              Checkout is not implemented yet, but thanks for your order!
            </p>
            <button className="cart__modal-button" onClick={handleCloseModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
