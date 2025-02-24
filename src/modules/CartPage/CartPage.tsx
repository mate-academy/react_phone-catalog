import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Loader } from '../../components/Loader';
import { Modal } from '../../components/Modal';
import { useCart } from '../../store/CartContext';
import styles from './CartPage.module.scss';

export const CartPage = () => {
  const { state, dispatch, loading } = useCart();
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const quantity = state.products.reduce((a, c) => {
      if (!c.quantity) {
        return 0;
      }

      return a + c.quantity;
    }, 0);
    const price = state.products.reduce((a, c) => {
      if (!c.quantity) {
        return 0;
      }

      return a + c.price * c.quantity;
    }, 0);

    setTotalPrice(price);
    setTotalQuantity(quantity);
  }, [state.products, totalPrice, totalQuantity]);

  const handleRemove = (id: number) => {
    dispatch({ type: 'REMOVE_PRODUCT', payload: { id: id } });
  };

  const handleUpdate = (id: number, quantity: number) => {
    dispatch({
      type: 'UPDATE_QUANTITY',
      payload: { id: id, quantity: quantity },
    });
  };

  const handleCheckout = () => {
    setIsModalOpen(true);
  };

  const handleClearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
    setIsModalOpen(false);
  };

  return (
    <div className={styles.cart}>
      {loading ? (
        <Loader />
      ) : (
        <div className={styles.cart__content}>
          <div className={classNames(styles.cart__header, styles.header)}>
            <button
              onClick={() => navigate(-1)}
              className={styles.header__button}
            >
              <div className={styles.header__icon}></div>
              <p className={styles.header__text}>Back</p>
            </button>
            {!state.products.length ? (
              <h1 className={styles.cart__title}>Your cart is empty</h1>
            ) : (
              <h1 className={styles.cart__title}>Cart</h1>
            )}
          </div>

          {state.products.length > 0 && (
            <>
              <ul className={styles.cart__list}>
                {state.products.map(product => {
                  const {
                    id,
                    itemId,
                    image,
                    name,
                    quantity = 1,
                    price,
                  } = product;

                  return (
                    <li
                      className={classNames(styles.cart__item, styles.item)}
                      key={itemId}
                    >
                      <div
                        className={classNames(
                          styles.item__part,
                          styles['item__part--one'],
                        )}
                      >
                        <button
                          className={classNames(
                            styles.item__button,
                            styles['item__button--remove'],
                          )}
                          onClick={() => handleRemove(id)}
                        ></button>
                        <Link
                          to={`/product/${itemId}`}
                          className={styles.item__link}
                        >
                          <img className={styles.item__img} src={image} />
                          <p className={styles.item__name}>{name}</p>
                        </Link>
                      </div>
                      <div
                        className={classNames(
                          styles.item__part,
                          styles['item__part--two'],
                        )}
                      >
                        <div className={styles.item__counter}>
                          <button
                            className={classNames(
                              styles.item__button,
                              styles['item__button--minus'],
                            )}
                            disabled={quantity === 1}
                            onClick={() => handleUpdate(id, quantity - 1)}
                          ></button>
                          <p className={styles.item__quantity}>{quantity}</p>
                          <button
                            className={classNames(
                              styles.item__button,
                              styles['item__button--plus'],
                            )}
                            onClick={() => handleUpdate(id, quantity + 1)}
                          ></button>
                        </div>
                        <h3 className={styles.item__price}>{'$' + price}</h3>
                      </div>
                    </li>
                  );
                })}
              </ul>

              <div
                className={classNames(styles.cart__checkout, styles.checkout)}
              >
                <div className={styles.checkout__info}>
                  <h2 className={styles.checkout__price}>${totalPrice}</h2>
                  <p className={styles.checkout__quantity}>
                    Total for {totalQuantity} items
                  </p>
                </div>
                <button
                  className={styles.checkout__button}
                  onClick={handleCheckout}
                >
                  Checkout
                </button>
              </div>
            </>
          )}
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onConfirm={handleClearCart}
        onCancel={() => setIsModalOpen(false)}
      />
    </div>
  );
};
