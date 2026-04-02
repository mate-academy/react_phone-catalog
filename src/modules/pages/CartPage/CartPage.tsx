import { useAppDispatch, useAppSelector } from '../../../store';
import { clearCart } from '../../../store/cartSlice';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { CartItem } from '../../components/CartItem';
import { EmptyState } from '../../components/EmptyState';
import './CartPage.scss';

export function CartPage() {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.cart.items);

  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  if (items.length === 0) {
    return (
      <div className="cart-page">
        <Breadcrumbs items={[{ label: 'Cart' }]} />
        <EmptyState
          imageSrc="/img/cart-is-empty.png"
          title="Your cart is empty"
          description="Add some products to get started."
        />
      </div>
    );
  }

  return (
    <div className="cart-page">
      <Breadcrumbs items={[{ label: 'Cart' }]} />

      <h1 className="cart-page__title">Cart</h1>

      <div className="cart-page__layout">
        <div className="cart-page__items">
          {items.map((item) => (
            <CartItem key={item.product.itemId} item={item} />
          ))}
        </div>

        <div className="cart-page__summary">
          <div className="cart-page__total-price">${total}</div>
          <p className="cart-page__total-label">
            Total for {totalItems} {totalItems === 1 ? 'item' : 'items'}
          </p>
          <div className="cart-page__summary-divider" />
          <button
            className="cart-page__checkout-btn"
            onClick={() => {
              alert('Checkout is not implemented yet.');
              dispatch(clearCart());
            }}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
