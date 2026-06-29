import { useContext, useState } from 'react';
import { CartContext } from '../../contexts/CartContext';
import React from 'react';
import Cart from './ShopCart.module.scss';
import { useNavigate } from 'react-router-dom';
import { ItemsForCart } from './components/ItemForCart';

export const ShopCart: React.FC = () => {
  const { cart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleConfirm = () => {
    clearCart();
    setIsModalOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={Cart.cart}>
      <div className="container">
        <div className={Cart.cart__content}>
          <div className={Cart.cart__top}>
            <button onClick={() => navigate(-1)} className={Cart.cart__back}>
              back
            </button>
            <h1 className={Cart.cart__title}>Cart</h1>
          </div>
          {cart.length === 0 ? (
            <div className={Cart.notFoundPage}>
              <h2 className={Cart.notFoundPage__title}>
                Your cart is empty...
              </h2>

              <div className={Cart.notFoundPage__image}></div>
            </div>
          ) : (
            <div className={Cart.cart__main}>
              <ItemsForCart />
              <div className={Cart.cart__checkout}>
                <div className={Cart.checkout__content}>
                  <h2 className={Cart.checkout__price}>
                    $
                    {cart.reduce(
                      (sum, item) => sum + item.price * item.quantity,
                      0,
                    )}
                  </h2>

                  <p className={Cart.checkout__amount}>
                    {`Total for ${cart.reduce(
                      (sum, item) => sum + item.quantity,
                      0,
                    )} items`}
                  </p>

                  <div className={Cart.checkout__line}></div>

                  <button
                    className={Cart.checkout__button}
                    onClick={() => setIsModalOpen(true)}
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        {isModalOpen && (
          <div className={Cart.modal}>
            <div className={Cart.modal__overlay} onClick={handleCancel} />

            <div className={Cart.modal__content}>
              <p className={Cart.modal__text}>
                Checkout is not implemented yet. Do you want to clear the Cart?
              </p>

              <div className={Cart.modal__actions}>
                <button className={Cart.modal__action} onClick={handleConfirm}>
                  Confirm
                </button>

                <button className={Cart.modal__action} onClick={handleCancel}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
