import React, { useState } from 'react';
import styles from './Cart.module.scss';
import { Footer } from '../Footer';
import { Products } from '../../types/Products';
import { useAppContext } from '../../AppContext';
import { ModalWindow } from '../ModalWindow';
import { useNavigate } from 'react-router-dom';

interface Props {
  models: Products[];
}

export const Cart: React.FC<Props> = ({ models }) => {
  const { cart, setCart, itemCounts, handleDecrement, handleIncrement } =
    useAppContext();
  const [visibleModal, setVisibleModal] = useState(false);
  const navigate = useNavigate();

  const visibleCartItems = models.filter(product =>
    cart.some(fav => fav.id === product.id),
  );

  const handleDeleteItem = (id: number) => {
    setCart(prevItems => prevItems.filter(item => item.id !== id));
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
              className={styles['cart__empty-image']}
              src="img/cart-is-empty.png"
              alt="cartEmpty"
            />
            <h2 className={styles.cart__title}>
              Ooop`s, seems cart is still empty!
            </h2>
          </div>
        ) : (
          <div className={styles.cart__container}>
            <button
              className={styles.cart__navigate}
              onClick={() => navigate(-1)}
            >
              <img
                className={styles.cart__arrow}
                src="img/burgerMenu/arrow.svg"
                alt="arrow"
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
                          src="img/burgerMenu/iconClose.png"
                          alt="iconCLose"
                          className={styles['cart__icon-delete']}
                        />
                      </button>
                      <img
                        src={item.image}
                        alt="product"
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
                            className={styles['cart__counter-image']}
                            src="img/cart/minus.svg"
                            alt="minus"
                          />
                        </button>
                        <p className={styles.cart__count}>
                          {itemCounts[item.id]}
                        </p>
                        <button
                          className={`${styles.cart__counter} ${styles['cart__counter--increment']}`}
                          onClick={() => {
                            handleIncrement(item.id);
                          }}
                        >
                          <img
                            className={styles['cart__counter-image']}
                            src="img/cart/plus.svg"
                            alt="plus"
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
