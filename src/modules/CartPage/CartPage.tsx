import { Link } from 'react-router-dom';
import { useCart } from '../shared/context/CartContext';

export const CartPage = () => {
  const {
    cartItems,
    decrement,
    increment,
    removeFromCart,
    clearCart,
    totalPrice,
    totalQuantity,
  } = useCart();
  const checkout = () => {
    if (
      window.confirm(
        'Checkout is not implemented yet. Do you want to clear the Cart?',
      )
    ) {
      clearCart();
    }
  };

  return (
    <section className="page">
      <p className="breadcrumbs">
        <Link to="/">Home</Link> / Cart
      </p>
      <h1 className="page__title">Cart</h1>
      {!cartItems.length ? (
        <div className="cart-empty">
          <img
            src={`${import.meta.env.BASE_URL}img/cart-is-empty.png`}
            alt="Cart is empty"
            loading="lazy"
          />
          <p>Your cart is empty</p>
        </div>
      ) : (
        <div className="cart-content">
          <div className="cart-list">
            {cartItems.map(({ id, product, quantity }) => (
              <article className="cart-item" key={id}>
                <button
                  type="button"
                  className="cart-item__close"
                  aria-label={`Remove ${product.name} from cart`}
                  onClick={() => removeFromCart(id)}
                >
                  ×
                </button>
                <img
                  src={`${import.meta.env.BASE_URL}${product.image}`}
                  alt={product.name}
                  className="cart-item__image"
                  loading="lazy"
                />
                <Link
                  to={`/product/${product.itemId}`}
                  className="cart-item__name"
                >
                  {product.name}
                </Link>
                <div className="cart-item__quantity">
                  <button
                    type="button"
                    aria-label="Decrease quantity"
                    onClick={() => decrement(id)}
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <span className="cart-item__quantity-value">{quantity}</span>
                  <button
                    type="button"
                    aria-label="Increase quantity"
                    onClick={() => increment(id)}
                  >
                    +
                  </button>
                </div>
                <strong className="cart-item__price">
                  ${product.price * quantity}
                </strong>
              </article>
            ))}
          </div>
          <div className="cart-total">
            <p className="cart-total__count">{totalQuantity} items</p>
            <h2 className="cart-total__price">${totalPrice}</h2>
            <button
              type="button"
              className="cart-total__button"
              onClick={checkout}
            >
              Checkout
            </button>
            <p className="cart-total__note">Tax is included</p>
          </div>
        </div>
      )}
    </section>
  );
};
