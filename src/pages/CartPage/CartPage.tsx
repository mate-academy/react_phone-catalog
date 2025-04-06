import { useCart } from '../../context/CartContext';
import styles from './CartPage.module.scss';
import { NavLink } from 'react-router-dom';

import arrowLeft from '../../imgs/svg/arrow-left-icon.svg';
import cross from '../../imgs/svg/cross-icon.svg';

export const CartPage: React.FC = () => {
  const {
    cart,
    removeFromCart,
    quantities,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();

  const totalPrice = cart.reduce(
    (total, product) => total + product.price * quantities[product.id],
    0,
  );

  const totalItems = Object.values(quantities).reduce(
    (total, quantity) => total + quantity,
    0,
  );

  const handleIncrease = (productId: number) => {
    increaseQuantity(productId);
  };

  const handleDecrease = (productId: number) => {
    decreaseQuantity(productId);
  };

  return (
    <div className={styles.cart}>
      <NavLink to="/" className={styles.cart__back}>
        <img
          src={arrowLeft}
          alt="arrow right"
          className={styles.cart__back_arrow}
        />
        <p className={styles.cart__back_text}>Back</p>
      </NavLink>
      <h2 className={styles.cart__title}>Cart</h2>
      {cart.length === 0 ? (
        <p className={styles.cart__empty}>Your cart is empty</p>
      ) : (
        <>
          <div className={styles.cart__group}>
            <ul className={styles.cart__list}>
              {cart.map(product => (
                <li key={product.id} className={styles.cart__item}>
                  <div className={styles.cart__desription}>
                    <button
                      className={styles.cart__remove}
                      onClick={() => removeFromCart(product.id)}
                    >
                      <img src={cross} alt="cross" />
                    </button>
                    <img
                      src={`${import.meta.env.BASE_URL}/${product.image}`}
                      alt={product.name}
                      className={styles.cart__image}
                    />
                    <p className={styles.cart__name}>{product.name}</p>
                  </div>

                  <div className={styles.cart__details}>
                    <div className={styles.cart__quantity}>
                      <button
                        className={styles.cart__quantityButton}
                        onClick={() => handleDecrease(product.id)}
                        disabled={quantities[product.id] === 1}
                      >
                        -
                      </button>
                      <span className={styles.cart__quantityValue}>
                        {quantities[product.id]}
                      </span>
                      <button
                        className={styles.cart__quantityButton}
                        onClick={() => handleIncrease(product.id)}
                      >
                        +
                      </button>
                    </div>
                    <h3 className={styles.cart__price}>
                      ${product.price * quantities[product.id]}
                    </h3>
                  </div>
                </li>
              ))}
            </ul>
            <div className={styles.cart__summary}>
              <div className={styles.cart__summary_text}>
                <h2 className={styles.cart__summary_text_total}>
                  ${totalPrice}
                </h2>
                <p className={styles.cart__summary_text_totalItems}>
                  Total for {totalItems} items
                </p>
              </div>
              <div className={styles.cart__summary_line}></div>
              <button className={styles.cart__summary_checkout}>
                Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
