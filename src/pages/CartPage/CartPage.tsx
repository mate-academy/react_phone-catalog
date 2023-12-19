import { useEffect, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { CartItem } from '../../components/CartItem/CartItem';
import { FavoritesContextType } from '../../types/FavoritesContextType';
import { Product } from '../../types/Product';
import './CartPage.scss';

export const CartPage = () => {
  const [checkoutMessage, setCheckoutMessage] = useState('');
  const navigate = useNavigate();
  const {
    cartItems,
    totalCartCount,
    totalPrice,
  }
    = useOutletContext<FavoritesContextType>();

  const handleBackButtonClick = () => {
    navigate(-1);
  };

  const handleCheckoutClick = () => {
    setCheckoutMessage('We are sorry, but this feature is not implemented yet');
  };

  useEffect(() => {
    let timer: number | undefined;

    if (checkoutMessage) {
      timer = window.setTimeout(() => {
        setCheckoutMessage('');
      }, 3000);
    }

    return () => {
      window.clearTimeout(timer);
    };
  }, [checkoutMessage]);

  return (
    <div className="cartPage">
      <button
        type="button"
        className="cartPage__back-button"
        data-cy="backButton"
        onClick={handleBackButtonClick}
      >
        <img
          src="img/icons/arrowRight.svg"
          alt="arrowLeft"
          className="pathInscription__arrowRight"
          style={{ transform: 'rotate(-90deg)' }}
        />
        <p className="pathInscription__text">Back</p>
      </button>

      <h1 className="cartPage__title">Cart</h1>

      <div className="cartPage__container">
        {cartItems && cartItems.length > 0 ? (
          <>
            <div data-cy="cartList" className="cartPage__cartList">
              {cartItems.map((product: Product) => (
                <CartItem key={product.id} product={product} />
              ))}
            </div>

            <div className="cartPage__total">
              <h1>
                $
                {totalPrice}
              </h1>
              <p className="cartPage__total-text">{`Total for ${totalCartCount} item${totalCartCount > 1 ? 's' : ''}`}</p>

              <button
                type="button"
                className="cartPage__checkout"
                onClick={handleCheckoutClick}
              >
                Checkout
              </button>
              {checkoutMessage && (
                <p className="cartPage__checkout-message">{checkoutMessage}</p>
              )}
            </div>
          </>
        ) : (
          <p className="cartPage__empty-message">Your cart is empty</p>
        )}
      </div>
    </div>
  );
};
