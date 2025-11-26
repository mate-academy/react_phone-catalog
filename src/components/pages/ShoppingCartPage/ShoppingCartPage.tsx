import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../../providers/CartProvider';
import { CartItem } from '../../../providers/CartReducer';
import { ShoppingCard } from './components/ShoppingCard';
import styles from './ShoppingCartPage.module.scss';

export const ShoppingCartPage: React.FC = () => {
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  const totalPrice = (carts: CartItem[]) => {
    return carts.reduce((sum, item) => {
      return sum + item.quantity * item.product.priceRegular;
    }, 0);
  };

  const cartLength = (carts: CartItem[]) => {
    return carts.reduce((sum, item) => sum + item.quantity, 0);
  };

  return (
    <div className={styles.shoppingCard}>
      <div className={styles.shoppingCard__back}>
        <span className={styles.shoppingCard__arrLeft} />
        <button onClick={() => navigate(-1)}>Back</button>
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
                Total: ${totalPrice(cart)}
              </p>
              <p className={styles.shoppingCard__checkoutItems}>
                Total for {cartLength(cart)} items
              </p>

              <button className={styles.shoppingCard__checkoutButton}>
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
