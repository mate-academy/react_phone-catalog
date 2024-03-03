import { memo } from 'react';
import { BackButton } from '../../components/BackButton';
import { CartItem } from '../../components/CartItem';
import { CartViewProps } from './types';
import './Cart.scss';

export const CartView = memo<CartViewProps>(({
  cartItems,
  incrementProduct,
  decrementQuantity,
  removeProduct,
  totalCost,
  totalItems,
}) => (
  <div className="cart">
    <BackButton />
    <h1 className="cart__title">Cart</h1>
    <div className="cart__content">
      <div className="cart__items">
        {cartItems.map(cartItem => (
          <CartItem
            key={cartItem.product.id}
            onIncrement={incrementProduct}
            onDecrement={decrementQuantity}
            cartItem={cartItem}
            onRemove={removeProduct}
          />
        ))}
      </div>
      <div className="cart__total">
        <h1 className="cart__total__price">
          {`$${totalCost}`}
        </h1>
        <p className="cart__total__text">
          {
            `Total for ${totalItems} item${totalItems > 1 ? 's' : ''}`
          }
        </p>
        <div className="cart__divider" />
        <button
          type="button"
          className="cart__checkout-button"
        >
          <span className="cart__checkout-text">
            Checkout
          </span>
        </button>
      </div>
    </div>
  </div>
));
