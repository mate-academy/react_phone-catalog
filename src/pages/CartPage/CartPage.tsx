import { GoBack } from '../../components/GoBack';
import { useProducts } from '../../shared/context/ProductsContext';
import { Counter } from './componets/Counter';
import { CartTotal } from './componets/CartTotal';
import { removeFromCart } from '../../shared/utils/cart/removeFromCart';

import deleteIco from '../../assets/icons/cart_icons/delete.svg';
import styles from './CartPage.module.scss';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export const CartPage: React.FC = () => {
  const { cartItems, setCartItems } = useProducts();
  const [, setSearchParams] = useSearchParams();

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    setSearchParams({});
  }, [setSearchParams]);

  return (
    <div className={styles.Cart}>
      <GoBack />
      <h1 className={styles.Cart__title}>Cart</h1>

      <div className={styles.Cart__container}>
        <div className={styles.Cart__items}>
          <ul className={styles.Cart__list}>
            {cartItems.map(product => (
              <li key={product.id} className={styles.list__item}>
                <div className={styles.item__info}>
                  <button
                    className={styles.item__deleteButton}
                    onClick={() =>
                      removeFromCart(product, cartItems, setCartItems)
                    }
                  >
                    <img src={deleteIco} alt="Delete item" />
                  </button>
                  <div className={styles.item__image}>
                    <img src={product.image} alt={product.name} />
                  </div>
                  <h2 className={styles.item__name}>{product.name}</h2>
                </div>

                <Counter
                  id={String(product.id)}
                  quantity={product.quantity}
                  product={product}
                />
              </li>
            ))}
          </ul>
        </div>

        <CartTotal totalPrice={totalPrice} cartItemCount={cartItemCount} />
      </div>
    </div>
  );
};
