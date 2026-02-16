/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const Cart: React.FC = () => {
  const { cart, removeFromCart, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <section className="cart-page">
        <h2>Cart</h2>
        <p>Your cart is empty.</p>
        <Link to="/products/phones">Browse products</Link>
      </section>
    );
  }

  return (
    <section className="cart-page">
      <h2>Cart ({cart.length} items)</h2>
      <button type="button" onClick={clearCart} style={{ marginBottom: 20 }}>
        Clear Cart
      </button>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {cart.map(product => {
          const price =
            (product as any).priceDiscount ??
            (product as any).priceRegular ??
            (product as any).price;

          return (
            <li
              key={product.id}
              style={{
                border: '1px solid #ddd',
                padding: 10,
                marginBottom: 10,
                display: 'flex',
                alignItems: 'center',
                gap: 15,
              }}
            >
              {product.images && product.images[0] && (
                <img
                  src={product.images[0]}
                  alt={product.name}
                  style={{ width: 80, height: 80, objectFit: 'cover' }}
                />
              )}
              <div style={{ flex: 1 }}>
                <Link
                  to={`/product/${product.category}/${product.id}`}
                  state={{ product }}
                >
                  {product.name}
                </Link>
                <p>Price: {price ?? '—'}</p>
              </div>
              <button type="button" onClick={() => removeFromCart(product.id)}>
                Remove
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Cart;
