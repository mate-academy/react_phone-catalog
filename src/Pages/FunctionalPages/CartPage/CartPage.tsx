import { useCart } from '../../../Functional/CartContext/CartContext';
import './CartPage.scss';

export const CartPage = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  if (cart.length === 0) {
    return (
      <section className="cart section">
        <h1 className="cart__title">Your Cart</h1>
        <p className="cart__empty">Your cart is empty.</p>
      </section>
    );
  }

  return (
    <section className="cart section">
      <h1 className="cart__title">Your Cart</h1>
      <div className="cart__content">
        <div className="cart__items">
          {cart.map(item => (
            <div
              key={`${item.id}-${item.color}-${item.capacity}`}
              className="cart__item"
            >
              <img
                src={item.image}
                alt={item.name}
                className="cart__item-image"
              />
              <div className="cart__item-details">
                <h3 className="cart__item-name">{item.name}</h3>
                <p className="cart__item-spec">Color: {item.color}</p>
                {item.capacity && (
                  <p className="cart__item-spec">Capacity: {item.capacity}</p>
                )}
                <p className="cart__item-price">${item.price}</p>
                <div className="cart__item-quantity">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity === 1}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <button
                  className="cart__item-remove"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="cart__summary">
          <h2>Total: ${totalPrice}</h2>
          <button className="cart__checkout">Checkout</button>
        </div>
      </div>
    </section>
  );
};
