import { useState } from 'react';
import back from '../../img/arrowLeft.svg';
import Empty from '../../../public/img/cart-is-empty.png'
import { BoughtCardItem } from '../BoughtCardItem/BoughtCardItem';
import { useInfoHook } from '../ProductInfo/useInfoHook';
import './CartPage.scss';
import { useCart } from './CartContext';
import { useReward } from 'react-rewards';
import { setTimeout } from 'timers/promises';

export const CartPage = () => {
  const { navigate } = useInfoHook();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCheckoutConfirmed, setIsCheckoutConfirmed] = useState(false);
  const { clearCart, updatedQuantity, removeFromCart, cart } = useCart();

  const totalCartPrice = cart.reduce((acc, item) => {
    const itemPrice = item.fullPrice * (item.quantity || 1);

    return acc + itemPrice;
  }, 0);

  const totalItemCount = cart.reduce((acc, item) => {
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
          <img src={back} alt="back" onClick={() => navigate(-1)} />
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
                onUpdate={updatedQuantity}
              />
            ))}
          </div>
          <div className="cart__wrapper--right">
            <h1 className="window__price">{`$${totalCartPrice}`}</h1>
            <p className="window__title">{`Total for ${totalItemCount} item(s)`}</p>
            <div className="product__row"></div>
            <button className="Checkout" onClick={handleCheckout}>
              Checkout
            </button>
          </div>
        </div>
      ) : (
        <div className="none">
          <img
            className="product__empty"
            src={Empty}
            alt="Favourites have not been choosen"
          />
        </div>
      )}
      {isModalOpen && (
        <div className="modal" onClick={() => setIsModalOpen(false)}>
          <div className="modal__content" onClick={e => e.stopPropagation()}>
            <h2 className="modal__title">Do you really want to buy this?</h2>
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
      {isCheckoutConfirmed && <></>}
    </main>
  );
};
