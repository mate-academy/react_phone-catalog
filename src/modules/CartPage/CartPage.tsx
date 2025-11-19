import React, { useEffect, useState } from 'react';
import Loader from '../shared/components/Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { useCart } from './CartContext';
import { Product } from '../../types/ProductTypes/Product';

import styles from './CartPage.module.scss';

const CartPage: React.FC = () => {
  const { cart, increaseQuantity, decreaseQuantity, removeFromCart, clearCart } = useCart();
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);

    fetch('/api/products.json')
      .then((res) => {
        if (!res.ok) throw new Error('Network response not ok');
        return res.json();
      })
      .then((data: Product[]) => {
        setAllProducts(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage onReload={() => window.location.reload()} />;

  const cartProducts = allProducts.filter((p) =>
    cart.some((item) => item.id === p.itemId)
  );

  if (cartProducts.length === 0) {
    return (
      <div className={styles.empty}>
        <p>Seu carrinho está vazio.</p>
      </div>
    );
  }

  const totalPrice = cartProducts.reduce((sum, product) => {
    const item = cart.find((c) => c.id === product.itemId);
    return sum + product.price * (item?.quantity || 1);
  }, 0);

  return (
    <div className={styles.cartPage}>
      <h1 className={styles.title}>🛒 Seu Carrinho</h1>

      <button className={styles.clearButton} onClick={clearCart}>
        Limpar Carrinho
      </button>

      <ul className={styles.list}>
        {cartProducts.map((product) => {
          const item = cart.find((c) => c.id === product.itemId);

          return (
            <li key={product.itemId} className={styles.item}>
              <div className={styles.left}>
                <img
                  src={product.image}
                  alt={product.name}
                  className={styles.image}
                />
                <div>
                  <h3 className={styles.name}>{product.name}</h3>
                  <p className={styles.price}>{product.price} $</p>
                </div>
              </div>

              <div className={styles.quantityControl}>
                <button onClick={() => decreaseQuantity(product.itemId)}>-</button>
                <span>{item?.quantity}</span>
                <button onClick={() => increaseQuantity(product.itemId)}>+</button>
              </div>

              <div className={styles.subtotal}>
                {(product.price * (item?.quantity || 1)).toFixed(2)} $
              </div>

              <button
                onClick={() => removeFromCart(product.itemId)}
                className={styles.removeButton}
              >
                Remover
              </button>
            </li>
          );
        })}
      </ul>

      <h2 className={styles.total}>
        Total: <span>{totalPrice.toFixed(2)} $</span>
      </h2>
    </div>
  );
};

export default CartPage;
