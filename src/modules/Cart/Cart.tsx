import { useContext } from 'react';

import styles from './Cart.module.scss';

import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { Breadcrumbs } from '../../shared/components/Breadcrumbs';

export const Cart = () => {
  const cartContext = useContext(CartContext);

  if (!cartContext) {
    return null;
  }

  const { cart, setCart } = cartContext;
  const handleDecreaseAmount = (itemId: string) => {
    setCart(prev =>
      prev
        .map(item =>
          item.product.itemId === itemId
            ? { ...item, amount: item.amount - 1 }
            : item,
        )
        .filter(item => item.amount > 0),
    );
  };

  const handleRemoveFromCart = (itemId: string) => {
    setCart(prev => prev.filter(item => item.product.itemId !== itemId));
  };

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.product.price * item.amount,
    0,
  );
  const totalAmount = cart.reduce((sum, item) => sum + item.amount, 0);

  const handleCheckout = () => {
    const needToClearCart = window.confirm(
      'Checkout is not implemented yet. Do you want to clear the Cart?',
    );

    if (needToClearCart) {
      setCart([]);
    }
  };

  const handleIncreaseAmount = (itemId: string) => {
    setCart(prev =>
      prev.map(item =>
        item.product.itemId === itemId
          ? { ...item, amount: item.amount + 1 }
          : item,
      ),
    );
  };

  return (
    <div className={styles.pageGrid}>
      <div className={styles.cart__breadcrumbs}>
        <Breadcrumbs title="cart" />
      </div>

      <h1 className={styles.title}>Cart</h1>
      {cart.length === 0 ? (
        <p className={styles['cart__empty-message']}>Your cart is empty</p>
      ) : (
        <div className={styles.cart__content}>
          <ul className={styles.cart__list}>
            {cart.map(item => (
              <li key={item.product.itemId} className={styles['cart-item']}>
                <div className={styles['cart-item__info']}>
                  <button
                    className={styles['cart-item__remove']}
                    onClick={() => handleRemoveFromCart(item.product.itemId)}
                  >
                    <img
                      src={`${import.meta.env.BASE_URL}/img/buttons/close.svg`}
                      alt="button-close"
                    />
                  </button>
                  <Link
                    to={`/product/${item.product.itemId}`}
                    className={styles['cart-item__link']}
                  >
                    <div className={styles['cart-item__image-container']}>
                      <img
                        src={`${import.meta.env.BASE_URL}/${
                          item.product.image.startsWith('/')
                            ? item.product.image.slice(1)
                            : item.product.image
                        }`}
                        alt="product-image"
                        className={styles['cart-item__image']}
                      />
                    </div>
                    <p className={styles['cart-item__title']}>
                      {item.product.name}
                    </p>
                  </Link>
                </div>
                <div className={styles['cart-item__controls']}>
                  <div className={styles['cart-item__counter']}>
                    <button
                      onClick={() => handleDecreaseAmount(item.product.itemId)}
                      className={styles['cart-item__counter-button']}
                    >
                      <img
                        src={`${import.meta.env.BASE_URL}/img/buttons/minus.png`}
                        alt="button-minus"
                      />
                    </button>
                    <span className={styles['cart-item__counter-value']}>
                      {item.amount}
                    </span>
                    <button
                      className={styles['cart-item__counter-button']}
                      onClick={() => handleIncreaseAmount(item.product.itemId)}
                    >
                      <img
                        src={`${import.meta.env.BASE_URL}/img/buttons/union.png`}
                        alt="button-union"
                      />
                    </button>
                  </div>
                  <p
                    className={styles['cart-item__price']}
                  >{`$${item.product.price * item.amount}`}</p>
                </div>
              </li>
            ))}
          </ul>

          {cart.length > 0 && (
            <div className={styles['cart-summary']}>
              <p className={styles['cart-summary__total']}>${totalPrice}</p>
              <p className={styles['cart-summary__text']}>
                Total for {totalAmount} items
              </p>
              <div className={styles['cart-summary__divider']}></div>
              <button
                className={styles['cart-summary__checkout']}
                onClick={handleCheckout}
              >
                Checkout
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
