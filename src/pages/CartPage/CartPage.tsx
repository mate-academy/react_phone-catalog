import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { formatPrice } from '../../utils/format';
import { Icon } from '../../components/Icon';
import { CartItem } from '../../components/CartItem';
import './CartPage.scss';

export const CartPage: React.FC = () => {
  useDocumentTitle('Cart - Nice Gadgets');
  const navigate = useNavigate();
  const { cartItems, removeFromCart, setCartQuantity, clearCart } = useShop();

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  const handleCheckout = () => {
    const shouldClear = window.confirm(
      'Checkout is not implemented yet. Do you want to clear the Cart?',
    );

    if (shouldClear) {
      clearCart();
    }
  };

  return (
    <div className="cart-page">
      <button
        type="button"
        className="cart-page__back"
        onClick={() => navigate(-1)}
      >
        <Icon name="chevron-left" />
        Back
      </button>

      <h1 className="cart-page__title">Cart</h1>

      {cartItems.length === 0 ? (
        <p className="cart-page__empty">Your cart is empty</p>
      ) : (
        <div className="cart-page__layout">
          <ul className="cart-page__list">
            {cartItems.map(item => (
              <CartItem
                key={item.product.itemId}
                item={item}
                onRemove={removeFromCart}
                onQuantityChange={setCartQuantity}
              />
            ))}
          </ul>

          <div className="cart-page__summary">
            <p className="cart-page__total-price">{formatPrice(totalPrice)}</p>
            <p className="cart-page__total-label">
              Total for {totalItems} item{totalItems === 1 ? '' : 's'}
            </p>
            <button
              type="button"
              className="cart-page__checkout"
              onClick={handleCheckout}
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
