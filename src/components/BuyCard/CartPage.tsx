import { useState } from 'react';
import back from '../../../image/back.svg';
import { ByCardItem } from '../ByCardItem/ByCardItem';
import { useInfoHook } from '../ProductInformation/useInfoHook';
import './CardPage.scss';
import { useCart } from './CartContext';
import ReactConfetti from 'react-confetti';
export const CardPage = () => {
  const { navigate } = useInfoHook();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCheckoutConfirmed, setIsCheckoutConfirmed] = useState(false);
  const { clearCart, updateQuantify, removeFromCart, cart } = useCart();

  const totalCartPrice = cart.reduce((total, item) => {
    const itemPrice = item.fullPrice * (item.quantity || 1);

    return total + itemPrice;
  }, 0);

  const totalItemCount = cart.reduce((total, item) => {
    return total + (item.quantity || 1);
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
          <img src={back} alt="back__link" onClick={() => navigate(-1)} />
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
              <ByCardItem
                key={product.id}
                product={product}
                onDelete={removeFromCart}
                onUpdate={updateQuantify}
              />
            ))}
          </div>
          <div className="cart__wrapper--right">
            <h1 className="window__price">{`$${totalCartPrice}`}</h1>
            <p className="window__title">{`Total for ${totalItemCount} item(s)`}</p>
            <div className="product__line"></div>
            <button className="Checkout" onClick={handleCheckout}>
              Checkout
            </button>
          </div>
        </div>
      ) : (
        <div className="nothing">
          <img
            className="product_yet"
            src="assets\cart-is-empty.png"
            alt="No_favorite_product_yet"
          />
        </div>
      )}
      {isModalOpen && (
        <div className="modal">
          <div className="modal__content">
            <h2 className="modal__title">Are you sure you want to buy this?</h2>
            <p className="window__price">{`Total: $${totalCartPrice}`}</p>
            <div className="modalbutton__wrapper">
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
      {isCheckoutConfirmed && <ReactConfetti />}
    </main>
  );
};
