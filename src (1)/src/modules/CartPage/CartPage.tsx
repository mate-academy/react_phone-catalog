import { useCart } from '../shared/context/CartContext';

export const CartPage = () => {
  const {
    cartItems,
    increment,
    decrement,
    removeFromCart,
    clearCart,
    totalPrice,
    totalQuantity,
  } = useCart();

  const handleCheckout = () => {
    const confirmed = window.confirm(
      'Checkout is not implemented yet. Do you want to clear the Cart?',
    );

    if (confirmed) {
      clearCart();
    }
  };

  if (cartItems.length === 0) {
    return (
      <div>
        <h1>Cart</h1>
        <p>Your cart is empty</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Cart</h1>

      <ul>
        {cartItems.map(item => (
          <li key={item.id}>
            <span>{item.product.name}</span>

            <button type="button" onClick={() => decrement(item.id)}>
              -
            </button>
            <span>{item.quantity}</span>
            <button type="button" onClick={() => increment(item.id)}>
              +
            </button>

            <span>${item.product.price * item.quantity}</span>

            <button type="button" onClick={() => removeFromCart(item.id)}>
              x
            </button>
          </li>
        ))}
      </ul>

      <p>Total items: {totalQuantity}</p>
      <p>Total: ${totalPrice}</p>

      <button type="button" onClick={handleCheckout}>
        Checkout
      </button>
    </div>
  );
};
