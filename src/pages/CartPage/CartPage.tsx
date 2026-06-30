import { mapProductToCard } from '../../utils/mapProductToCard';

import styles from './CartPage.module.scss';
import { useProducts } from '../../hooks/useProducts';
import { useMemo } from 'react';
import { useCart } from '../../context/CartContext';
import { BackButton } from '../../components/BackButton/BackButton';
import { CartItem } from '../../components/CartItem/CartItem';

export const CartPage = () => {
  const { products } = useProducts();
  const { cart, clearCart } = useCart();
  const cartProducts = useMemo(
    () =>
      products
        .filter(product => cart.some(item => item.id === product.itemId))
        .map(mapProductToCard),
    [products, cart],
  );

  const totalItems = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart],
  );

  const totalPrice = useMemo(
    () =>
      cartProducts.reduce((sum, product) => {
        const cartItem = cart.find(item => item.id === product.id);

        return sum + product.price * (cartItem?.quantity ?? 0);
      }, 0),
    [cartProducts, cart],
  );

  // const { cart, clearCart } = useCart();

  return (
    <div className={styles.cart}>
      <BackButton />

      <h2 className={styles.title}>Cart</h2>

      {cartProducts.length === 0 ? (
        <p className={styles.emptyMessage}>No products in cart yet</p>
      ) : (
        <div className={styles.checkoutProducts}>
          <div className={styles.checkoutProducts__info}>
            {cartProducts.map(product => (
              <CartItem
                key={product.id}
                id={product.id}
                image={product.image}
                name={product.name}
                price={product.price}
              />
            ))}
          </div>

          <div className={styles.checkoutProducts__sum}>
            <h1>${totalPrice}</h1>

            <p>Total for {totalItems} items</p>

            <button
              onClick={() => {
                const confirmed = window.confirm(
                  'Are you sure you want to place the order?',
                );

                if (confirmed) {
                  clearCart();
                  alert('Order successfully placed!');
                }
              }}
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
