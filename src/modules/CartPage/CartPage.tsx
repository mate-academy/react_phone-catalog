import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import styles from './CartPage.module.scss';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';


export const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, clearCart  } = useCart();
  const navigate = useNavigate();
  const [checkoutMessage, setCheckoutMessage] = useState<string | null>(null);

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0,
  );

  const handleCheckout = () => {
    clearCart();
    setCheckoutMessage(
      '✅ Thank you for your purchase! Your order is being processed.',
    );
  };

  useEffect(() => {
    if (checkoutMessage) {
      const timer = setTimeout(() => {
        setCheckoutMessage(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [checkoutMessage]);



  /*const handleGoToProduct = (item: any) => {

    const foundProduct = products.find(
      p => p.itemId === item.itemId && p.category === item.category,
    );

    if (foundProduct) {
      navigate(`/${foundProduct.category}/${foundProduct.itemId}`);
    } else {
      console.log('Product not found:', item);
    }
  }; */

  const handleGoToProduct = (item: any) => {
    navigate(`/${item.category}/${item.itemId}`);
  };


  return (
    <div className={styles.cartPage}>
      <button
        className={`${styles.backButton} small-text12`}
        onClick={() => navigate(-1)}
      >
        <img src="./img/Back.svg" alt="back" />
        Back
      </button>

      <h1 className={`${styles.cartPage__title} h1`}>Cart</h1>

      <div className={styles.cartPage__content}>
        <div className={styles.cartPage__itemsList}>
          {cart.map(item => (
            <div key={item.uniqueId} className={styles.item}>
              <div className={styles.item__header}>
                <button
                  className={styles.item__remove}
                  onClick={() => removeFromCart(item.uniqueId)}
                >
                  <img src="./img/Close__.png" alt="remove" />{' '}
                </button>

                <Link
                  to={`/${item.category}/${item.itemId}`}
                  className={styles.item__link}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className={styles.item__img}
                  />

                  <span className={`${styles.item__name} body-text14Bold`}>
                    {item.name}
                  </span>
                </Link>
              </div>

              <div className={styles.item__footer}>
                <div className={styles.quantity}>
                  <button
                    className={styles.quantity__btn}
                    onClick={() => updateQuantity(item.uniqueId, -1)}
                    disabled={item.quantity <= 1}
                  >
                    <img src="./img/Minus.svg" alt="minus" />
                  </button>
                  <span className={`${styles.quantity__count} body-text14Bold`}>
                    {item.quantity || 1}
                  </span>
                  <button
                    className={styles.quantity__btn}
                    onClick={() => updateQuantity(item.uniqueId, 1)}
                  >
                    <img src="./img/Plus.svg" alt="plus" />
                  </button>
                </div>
                <p className={`${styles.item__price} price-text`}>
                  ${item.price * (item.quantity || 1)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Блок Summary */}
        {(cart.length > 0 || checkoutMessage) && (
          <div className={styles.summary}>
            <h2 className={`${styles.summary__total} h2`}>${totalPrice}</h2>
            <p className={`${styles.summary__text} body-text14Bold`}>
              Total for {cart.reduce((sum, item) => sum + item.quantity, 0)}{' '}
              items
            </p>
            <div className={styles.summary__line}></div>
            <button
              className={`${styles.summary__checkout} button-text`}
              onClick={handleCheckout}
            >
              Checkout
            </button>

            {checkoutMessage && (
              <p className={styles.checkoutMessage}>{checkoutMessage}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
