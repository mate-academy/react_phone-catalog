import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { getCart, removeFromCart, addToCart } from '../store/cart';
import type { CartItem } from '../store/cart';

import { loadProducts } from '../data/products';
import type { Product } from '../types/Product';

import { getProductPrice } from '../utils/price';
import { resolveImage } from '../utils/image';

type CartView = {
  item: CartItem;
  product: Product;
  image: string;
  price: number;
};

export const Cart = () => {
  const [items, setItems] = useState<CartView[]>([]);

  useEffect(() => {
    const updateCart = async () => {
      const cart = getCart();
      const products = await loadProducts();

      const resolved: CartView[] = cart
        .map(item => {
          const product = products.find(p => p.id === item.id);
          if (!product) return null;

          const baseImg = product.images[0];
          const parts = baseImg.split('/');

          if (parts.length >= 3) {
            parts[parts.length - 2] = item.color;
          }

          return {
            item,
            product,
            image: resolveImage(parts.join('/')),
            price: getProductPrice(product, item.capacity),
          };
        })
        .filter((v): v is CartView => v !== null);

      setItems(resolved);
    };

    updateCart();

    const handler = () => updateCart();
    window.addEventListener('storage-update', handler);

    return () => window.removeEventListener('storage-update', handler);
  }, []);

  const total = items.reduce(
    (sum, i) => sum + i.price * i.item.quantity,
    0,
  );

  const totalCount = items.reduce(
    (sum, i) => sum + i.item.quantity,
    0,
  );

  const increase = (item: CartItem) => {
    addToCart(item.id, item.color, item.capacity);
  };

  const decrease = (item: CartItem) => {
    if (item.quantity <= 1) {
      removeFromCart(item.id, item.color, item.capacity);
      return;
    }

    const cart = getCart().map(c => {
      if (
        c.id === item.id &&
        c.color === item.color &&
        c.capacity === item.capacity
      ) {
        return { ...c, quantity: c.quantity - 1 };
      }
      return c;
    });

    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('storage-update'));
  };

  return (
    <div style={{ maxWidth: 900, margin: '0 auto' }}>
      <Link to="/catalog" className="hero-back">
        Back
      </Link>

      <h1 style={{ marginBottom: 30 }}>Cart</h1>

      {items.length === 0 && <p>Your cart is empty</p>}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {items.map(({ item, product, image, price }) => (
          <div
            key={`${item.id}-${item.color}-${item.capacity}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 25,
              padding: 20,
              borderRadius: 18,
              border: '1px solid #e6eef2',
              background: '#fff',
            }}
          >
            <img src={image} width={90} style={{ borderRadius: 12 }} />

            <div style={{ flex: 1 }}>
              <h3 style={{ margin: 0 }}>
                {product.name} {item.capacity} {item.color.replace('-', ' ')}
              </h3>

              <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
                <button onClick={() => decrease(item)}>-</button>
                <div>{item.quantity}</div>
                <button onClick={() => increase(item)}>+</button>
              </div>

              <button
                onClick={() =>
                  removeFromCart(item.id, item.color, item.capacity)
                }
                style={{
                  marginTop: 8,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#94aeb8',
                  letterSpacing: '1px',
                }}
              >
                Remove
              </button>
            </div>
<div style={{ textAlign: 'right', minWidth: 120 }}>
              <div style={{ fontSize: 14, color: '#8aa8b5' }}>
                {item.quantity} × ${price}
              </div>

              <div style={{ fontSize: 20, marginTop: 6, fontWeight: 500 }}>
                ${price * item.quantity}
              </div>
            </div>
          </div>
        ))}
      </div>

      {items.length > 0 && (
        <div
          style={{
            marginTop: 50,
            paddingTop: 25,
            borderTop: '1px solid #e6eef2',
            textAlign: 'right',
          }}
        >
          <div style={{ color: '#8aa8b5', marginBottom: 8 }}>
            Total items: {totalCount}
          </div>

          <div style={{ fontSize: 28, marginBottom: 20 }}>
            Total: ${total}
          </div>

          <button
            onClick={() => {
              alert('Order placed successfully!');
              localStorage.removeItem('cart');
              window.dispatchEvent(new Event('storage-update'));
            }}
            style={{
              fontSize: 18,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#8aa8b5',
              marginTop: 10,
            }}
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );
};