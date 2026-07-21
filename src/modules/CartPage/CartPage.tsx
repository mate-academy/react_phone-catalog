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
      <h1>Cart</h1>
      {!cartItems.length ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <div className="cart-list">
            {cartItems.map(({ id, product, quantity }) => (
              <article className="cart-item" key={id}>
                <img
                  src={`${import.meta.env.BASE_URL}${product.image}`}
                  alt={product.name}
                />
                <h2>{product.name}</h2>
                <div>
                  <button
                    type="button"
                    aria-label="Decrease quantity"
                    onClick={() => decrement(id)}
                  >
                    -
                  </button>{' '}
                  {quantity}{' '}
                  <button
                    type="button"
                    aria-label="Increase quantity"
                    onClick={() => increment(id)}
                  >
                    +
                  </button>
                </div>
                <strong>${product.price * quantity}</strong>
                <button
                  type="button"
                  aria-label={`Remove ${product.name}`}
                  onClick={() => removeFromCart(id)}
                >
                  ×
                </button>
              </article>
            ))}
          </div>
          <div className="cart-total">
            <p>{totalQuantity} items</p>
            <h2>${totalPrice}</h2>
            <button type="button" onClick={checkout}>
              Checkout
            </button>
          </div>
        </>
      )}
    </section>
  );
};
