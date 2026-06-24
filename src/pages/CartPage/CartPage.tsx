import React, { useContext, useEffect, useState } from 'react';
import styles from './CartPage.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../utils/themeContext';
import { Theme } from '../../../public/api/types/theme';
import { useShop } from '../../components/ShopContext';
import { Loader } from '../../components/Loader';

const MIN_QTY = 1;
const MAX_QTY = 10;

export const CardPage = () => {
  const { state, incrementItem, decrementItem, removeFromCart } = useShop();
  const uniqueItems = Object.values(state.cart);
  const { theme } = useContext(ThemeContext);
  const [message, setMessage] = useState('');
  const [items, setItems] = useState(0);
  const [loading, setLoading] = useState(false);
  const { clearCart } = useShop();

  const total = uniqueItems.reduce(
    (sum, { product, qty }) => sum + (product.price ?? product.fullPrice) * qty,
    0,
  );

  useEffect(() => {
    setItems(uniqueItems.reduce((sum, item) => sum + item.qty, 0));
  }, [uniqueItems]);
  // const items = uniqueItems.reduce((sum, item) => sum + item.qty, 0);

  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    if (location.state?.from) {
      navigate(location.state.from, { replace: true });
    } else {
      navigate(-1);
    }
  };

  const handleCheckOut = () => {
    setLoading(true);

    setTimeout(() => {
      clearCart();
      setMessage('The order is complete!');
      setLoading(false);
    }, 500);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div
        className={[
          styles.container,
          theme === Theme.LIGHT ? styles['container--light'] : '',
        ].join(' ')}
      >
        <div className={styles.container__backbutton}>
          <div
            className={styles.container__backbutton__back}
            onClick={handleBack}
          >
            <span className={styles.container__backbutton__icon} />
            <p className={styles.container__backbutton__button}>Back</p>
          </div>
        </div>
        <section className={styles.container__body}>
          <h1 className={styles.container__body__title}>Cart</h1>
          <p className={styles.container__body__text}>{items} items</p>

          {message && (
            <p className={styles.container__body__message}>{message}</p>
          )}

          <div className={styles.container__body__cart}>
            {uniqueItems.length === 0 ? (
              <div className={styles.container__body__empty}>
                <p className={styles.container__body__empty__text}>
                  Your cart is empty
                </p>
                <img
                  src="img/cart-is-empty.png"
                  alt="Empty Cart"
                  className={styles.container__body__empty__img}
                />
              </div>
            ) : (
              <div className={styles.container__body__carts}>
                <div className={styles.container__body__products}>
                  {uniqueItems.map(({ product, qty }) => (
                    <div
                      key={product.itemId}
                      className={styles.container__body__item}
                    >
                      <div className={styles.container__body__item__up}>
                        <img
                          src="img/icons/CloseGrey.svg"
                          alt={product.name}
                          className={styles.container__body__item__remove}
                          onClick={() => removeFromCart(product.itemId)}
                        />
                        <img
                          src={product.image}
                          alt={product.name}
                          className={styles.container__body__item__img}
                        />
                        <p className={styles.container__body__item__text}>
                          {product.name}
                        </p>
                      </div>
                      <div className={styles.container__body__item__controls}>
                        <div className={styles.container__body__item__quantity}>
                          <button
                            className={styles.container__body__item__button}
                            onClick={() => decrementItem(product.itemId)}
                            disabled={qty <= MIN_QTY}
                          >
                            -
                          </button>
                          <p className={styles.container__body__item__qty}>
                            {qty}
                          </p>
                          <button
                            className={styles.container__body__item__button}
                            onClick={() => incrementItem(product.itemId)}
                            disabled={qty >= MAX_QTY}
                          >
                            +
                          </button>
                        </div>
                        <p className={styles.container__body__item__price}>
                          ${product.price ?? product.fullPrice}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className={styles.container__body__total}>
                  <p className={styles.container__body__total__price}>
                    ${total}
                  </p>
                  <p className={styles.container__body__total__text}>
                    Total for {items} items
                  </p>

                  <button
                    className={styles.container__body__total__button}
                    onClick={handleCheckOut}
                  >
                    Checkout
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
};
