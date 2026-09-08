import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../../providers/CartProvider';
import { getCartCount, getTotalPrice } from '../../../utils/cartUtils';
import { ShoppingCard } from './components/ShoppingCard';
import styles from './ShoppingCartPage.module.scss';

export const ShoppingCartPage: React.FC = () => {
  const { cart, dispatch } = useContext(CartContext);
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (cart.length === 0) {
      return;
    }

    alert('Thank you for your purchase!');
    dispatch({ type: 'Clear' });
  };

  return (
    <div className={styles.shoppingCard}>
      <div className={styles.shoppingCard__back}>
        <span className={styles.shoppingCard__arrLeft} />
        <button onClick={() => navigate('/')}>Back</button>
      </div>

      <h1 className={styles.shoppingCard__title}>Cart</h1>
      <div className={styles.shoppingCard__productContainer}>
        {cart.length !== 0 ? (
          <>
            <div className={styles.shoppingCard__productList}>
              {cart.map(item => (
                <ShoppingCard key={item.product.id} item={item} />
              ))}
            </div>

            <div className={styles.shoppingCard__checkout}>
              <p className={styles.shoppingCard__checkoutPrice}>
                ${getTotalPrice(cart)}
              </p>
              <p className={styles.shoppingCard__checkoutItems}>
                Total for ${getCartCount(cart)} items
              </p>

              <button
                className={styles.shoppingCard__checkoutButton}
                onClick={handleCheckout}
              >
                Checkout
              </button>
            </div>
          </>
        ) : (
          <h3 className={styles.shoppingCard__isEmpty}>
            Your shopping cart is empty!
          </h3>
        )}
      </div>
    </div>
  );
};
