import { RootState } from 'app/store';
import { removeFromCart } from 'features/cart/cartSlice';
import { useDispatch, useSelector } from 'react-redux';

import { GoBack } from 'shared/components/ui/GoBack';
import { Icon } from 'shared/components/ui/Icon/Icon';
import { IconNames } from 'shared/components/ui/Icon/IconNames';

import styles from './CartPage.module.scss';

export const CartPage: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (id: string) => {
    dispatch(removeFromCart(id));
  };

  return (
    <article className={styles.cartPage}>
      <header>
        <nav aria-label="back" className={styles.navigation}>
          <GoBack />
        </nav>
        <h1 className={styles.title}>Cart</h1>
      </header>

      {cartItems.length !== 0 ? (
        <div className={styles.cartInfo}>
          <ul className={styles.cartList}>
            {cartItems.map(item => (
              <li key={item.product.id}>
                <article className={styles.cartItem}>
                  <button
                    type="button"
                    onClick={() => handleRemoveFromCart(item.product.id)}
                  >
                    <Icon className={styles.crossIcon} name={IconNames.Cross} />
                  </button>
                  <div className={styles.imageWrapper}>
                    <img alt={item.product.name} src={item.product.image} />
                  </div>
                </article>
              </li>
            ))}
          </ul>

          <div className={styles.totalItems}>
            {/* Сумма, кнопка Checkout и т.д. */}
          </div>
        </div>
      ) : (
        <section className={styles.empty}>
          <img
            alt="Illustration of an empty cart"
            className={styles.emptyImage}
            src="/images/empty-cart.png"
          />
          <p>Your cart is empty</p>
        </section>
      )}
    </article>
  );
};
