import styles from './CartPage.module.scss';
import { useContext } from 'react';
import { DataContext } from '../../context/DataContext';
import { CartItem } from './CartItem';
import { useNavigate } from 'react-router-dom';
import arrowRight from '../../assets/icons/arrow-right.svg';

export const CartPage = () => {
  const { cart } = useContext(DataContext);
  const navigate = useNavigate();

  const totalCartPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  return (
    <div className={styles.cart}>
      <div className="container">
        <button onClick={() => navigate(-1)} className={styles.backButton}>
          <img
            src={arrowRight}
            alt="chevron"
            className={styles.backButton__icon}
          />
          <span>Back</span>
        </button>
        <h1 className={styles.cart__title}>Cart</h1>

        <div className={styles.cart__content}>
          <ul className={styles.cart__list}>
            {cart.map(product => (
              <CartItem key={product.id} product={product} />
            ))}
          </ul>

          <div className={styles.cartTotal}>
            <div className={styles.cartTotal__content}>
              <h2
                className={styles.cartTotal__value}
              >{`$${totalCartPrice}`}</h2>
              <p className={styles.cartTotal__amountItems}>
                {`Total for ${cart.length} items`}
              </p>
            </div>
            <div className={styles.cartTotal__divider}></div>
            <button className={styles.cartTotal__checkout} onClick={() => {}}>
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
