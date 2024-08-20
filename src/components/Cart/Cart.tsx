import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Cart.module.scss';
import { Products } from '../../types/Products';
import { useAppContext } from '../../AppContext';
import { ModalWindow } from '../ModalWindow';
import { Footer } from '../Footer';

interface Props {
  models: Products[];
}

export const Cart: React.FC<Props> = ({ models }) => {
  const { cart, setCart, handleIncrement, handleDecrement, itemCounts } =
    useAppContext();
  const [visibleModal, setVisibleModal] = useState(false);
  const navigate = useNavigate();

  const visibleCartItems = models.filter(products =>
    cart.some(item => item.id === products.id),
  );

  const handleDeleteItem = (id: number) => {
    setCart(prevItem => prevItem.filter(item => item.id !== id));
  };

  const totalPrice = visibleCartItems.reduce(
    (total, item) => total + item.price * itemCounts[item.id],
    0,
  );

  return (
    <div className="page">
      <section className={styles.cart}>
        {cart.length === 0 ? (
          <div className={styles.cart__empty}>
            <img
              src="img/cart-is-empty.png"
              alt="emptyCart"
              className={styles['cart__empty-image']}
            />
            <h2 className={styles.cart__title}>
              Sorry, seems cart is still ampty!
            </h2>
          </div>
        ) : (
          <div className={styles.cart__container}>
            <button
              className={styles.cart__navigate}
              onClick={() => navigate(-1)}
            >
              <img
                src="img/icons/Chevron-left-white.svg"
                alt="arrow-left"
                className={styles.cart__arrow}
              />
              <p className={styles.cart__back}>Back</p>
            </button>
            <h2 className={styles.cart__title}>Cart</h2>
            <div className={styles.cart__content}>
              <div className={styles.cart__items}>
                {visibleCartItems.map(item => (
                  <div className={styles.cart__item} key={item.id}>
                    <div className={styles.cart__info}>
                      <button
                        className={styles.cart__delete}
                        onClick={() => handleDeleteItem(item.id)}
                      >
                        <img
                          src="img/icons/Close-gray.svg"
                          alt="iconClose"
                          className={styles['cart__icon-delete']}
                        />
                      </button>
                      <img
                        src={item.image}
                        alt={item.name}
                        className={styles.cart__image}
                      />
                      <p className={styles.cart__name}>{item.name}</p>
                    </div>
                    <div className={styles.cart__navigation}>
                      <div className={styles['cart__count-control']}>
                        <button
                          className={`${styles.cart__counter} ${styles['cart__counter--decrement']}`}
                          onClick={() => handleDecrement(item.id)}
                        >
                          <img
                            src="img/icons/Minus-gray.svg"
                            alt="minus"
                            className={styles['cart__counter-image']}
                          />
                        </button>
                        <p className={styles.cart__count}>
                          {itemCounts[item.id]}
                        </p>
                        <button
                          className={`${styles.cart__counter} ${styles['cart__counter--increment']}`}
                          onClick={() => handleIncrement(item.id)}
                        >
                          <img
                            src="img/icons/Plus.svg"
                            alt="plus"
                            className={styles['cart__counter-image']}
                          />
                        </button>
                      </div>
                      <h3 className={styles.cart__price}>{`$${item.price}`}</h3>
                    </div>
                  </div>
                ))}
              </div>
              <div className={styles.cart__submit}>
                <div className={styles.cart__total}>
                  <h3
                    className={styles['cart__total-price']}
                  >{`$${totalPrice}`}</h3>
                  {cart.length === 1 ? (
                    <p className={styles['cart__total-items']}>
                      Total for 1 item
                    </p>
                  ) : (
                    <p className={styles['cart__total-items']}>
                      {`Total for ${cart.length} items`}
                    </p>
                  )}
                </div>
                <button
                  className={styles.cart__checkout}
                  onClick={() => setVisibleModal(true)}
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
      {visibleModal && <ModalWindow setVisibleModal={setVisibleModal} />}
      <Footer />
    </div>
  );
};
