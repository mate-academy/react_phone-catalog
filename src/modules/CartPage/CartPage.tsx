import './CartPage.scss';
import { Product } from '../../types/Product';
import { CartCard } from './components/CartCard/CartCard';
import NavToBack from '../../shared/NavToBack/NavToBack';
import { useEffect, useState } from 'react';
import CartAmount from './components/CartAmount/CartAmount';

type CartItem = {
  item: Product;
  quantity: number;
};

export const useCartQuantity = () => {
  const [totalQuantity, setTotalQuantity] = useState<number>(0);

  useEffect(() => {
    const updateQuantity = () => {
      const cart: CartItem[] = JSON.parse(
        localStorage.getItem('CartStore') || '[]',
      );
      const total = cart.reduce((sum, item) => sum + item.quantity, 0);

      setTotalQuantity(total);
    };

    updateQuantity();

    window.addEventListener('quantity-update', updateQuantity);
    window.addEventListener('delete-update', updateQuantity);

    return () => {
      window.removeEventListener('quantity-update', updateQuantity);
      window.removeEventListener('delete-update', updateQuantity);
    };
  }, []);

  return totalQuantity;
};

export const CartPage = () => {
  const [checkoutActive, setCheckoutActive] = useState<boolean>(false);
  const [cart, setCartState] = useState<CartItem[]>(() => {
    return JSON.parse(localStorage.getItem('CartStore') || '[]');
  });

  useEffect(() => {
    localStorage.setItem('CartStore', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (cart.length === 0) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = '';
    }

    return () => {
      document.body.style.overflowY = '';
    };
  }, [cart.length]);

  const allDelete = () => {
    localStorage.setItem('CartStore', JSON.stringify([]));
    setCartState([]);
    window.dispatchEvent(new Event('delete-update'));
  };

  return (
    <div className="card-page">
      <div className="card-top">
        <NavToBack />
        <p className="text-h1">Cart</p>
      </div>

      <div className="cart__content">
        {cart.length === 0 ? (
          <div className="cart__empty">
            <div className="cart__empty-photo"></div>
          </div>
        ) : (
          <>
            <div className="cart__cards">
              {cart.map((product: CartItem, index: number) => (
                <CartCard
                  key={index}
                  product={product}
                  setCartState={setCartState}
                />
              ))}
            </div>
            <div className="cart__amount">
              <CartAmount setCheckoutActive={setCheckoutActive} />
            </div>
          </>
        )}
      </div>

      {checkoutActive ? (
        <div className="cart__message-overlay">
          <div className="cart__message">
            <div className="cart__message-header">
              <p className="text-h3">Cart</p>
              <div
                className="icon--close"
                onClick={() => {
                  setCheckoutActive(false);
                }}
              ></div>
            </div>
            <p className="text-h4">
              Checkout is not implemented yet. Do you want to clear the Cart?
            </p>

            <div className="cart__message-buttons">
              <button
                className={`button cart__message-button
                  cart__message-button--confirm text-button`}
                onClick={() => {
                  setCheckoutActive(false);
                  allDelete();
                }}
              >
                Confirm
              </button>
              <button
                className={`button cart__message-button
                  cart__message-button--cancel text-button`}
                onClick={() => {
                  setCheckoutActive(false);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default CartPage;
