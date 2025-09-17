import { useState } from 'react';
import './CartPage.scss';
import { useInfoHook } from '../ProductInfo/useInfoHook';
import { useCart } from './CartContext';
import { BoughtCardItem } from '../BoughtCardItem/BoughtCardItem';
import { CheckoutChears } from '../Reward/Reward';

export const CartPage = () => {
  const { navigate } = useInfoHook();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
  const [isCheckoutConfirmed, setIsCheckoutConfirmed] = useState(false);

  const totalCartPrice = cart.reduce((acc, item) => {
    const itemPrice = item.fullPrice * (item.quantity || 1);

    return acc + itemPrice;
  }, 0);

  const totalCartItem = cart.reduce((acc, item) => {
    return acc + (item.quantity || 1);
  }, 0);

  const handleCheckout = () => {
    setIsModalOpen(true);
  };

  const confirmCheckout = () => {
    localStorage.removeItem('cart');
    setIsModalOpen(false);
    clearCart();
    setIsCheckoutConfirmed(true);
    setTimeout(() => {
      setIsCheckoutConfirmed(false);
    }, 5000);
  };

  return (
    <main className="main__phonepage">
      <h1 className="title">
        <div className="productInfolink__back">
          <img src="" alt="back" onClick={() => navigate(-1)} />
          <p
            className="productInfolink__backTitle"
            onClick={() => navigate(-1)}
          >
            Back
          </p>
        </div>
      </h1>
      <h1 className="page__title">Cart</h1>
      {cart.length > 0 ? (
        <div className="cart__wrapper">
          <div className="cart__wrapper--left">
            {cart.map(product => (
              <BoughtCardItem
                key={product.id}
                product={product}
                onDelete={removeFromCart}
                onUpdate={updateQuantity}
              />
            ))}
          </div>
          <div className="cart__wrapper--right">
            <h1 className="window__price">{`$${totalCartPrice}`}</h1>
            <p className="window__title">{`Total for ${totalCartItem} items`}</p>
            <div className="product__row"></div>
            <button className="checkout" onClick={handleCheckout}>
              Checkout
            </button>
          </div>
        </div>
      ) : (
        <div className="none">
          <img
            src="img/cart-is-empty.png"
            alt="Your cart is empty"
            className="product__empty"
          />
        </div>
      )}
      {isModalOpen && (
        <div className="modal" onClick={() => setIsModalOpen(false)}>
          <div className="modal__content" onClick={e => e.stopPropagation()}>
            <h2 className="modal__title">Do you want to buy this?</h2>
            <p className="window__price">{`Total: $${totalCartPrice}`}</p>
            <div className="modalbtn__wrapper">
              <button className="confirm" onClick={confirmCheckout}>
                Confirm
              </button>
              <button className="cancel" onClick={() => setIsModalOpen(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {isCheckoutConfirmed && <CheckoutChears trigger={isCheckoutConfirmed} />}
    </main>
  );
};
