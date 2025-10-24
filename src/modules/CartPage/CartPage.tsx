/* eslint-disable max-len */
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  addQty,
  clearCart,
  removeFromCart,
  selectCartItems,
  selectCartTotals,
  takeQty,
} from '../../store/slices/cartSlice';
import { BackButton } from '../shared/components/Buttons/BackButton/BackButton';
import styles from './CartPage.module.scss';
import buttonStyle from '../shared/components/Buttons/Button.module.scss';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export const CartPage = () => {
  const dispatch = useAppDispatch();
  const itemsInCart = useAppSelector(selectCartItems);
  const totals = useAppSelector(selectCartTotals);

  const [open, setOpen] = useState(false);

  const popupText = `This "Checkout" button is just for demonstration purposes. It won't actually buy you anything (I'm not that sneaky 😄).
  If you press Confirm, your cart will be cleared!
  Are you really sure you want to say goodbye to all those precious items? 🛒✨
  `;

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <div className={styles.cart}>
      <div className={styles.cart__wrapper}>
        <div className={styles.cart__container}>
          <section className={styles.product__header}>
            <BackButton fallback={`/`} />
            <h1 className={styles.cart__title}>Cart</h1>
          </section>

          {itemsInCart.length > 0 ? (
            <section className={styles.cart__body}>
              <div className={styles.cart__items}>
                <div className={styles.item__body}>
                  {itemsInCart &&
                    itemsInCart.map(i => {
                      const itemId = i.item.itemId;
                      const item = i.item;
                      const qty = i.qty;

                      return (
                        <div key={item.itemId} className={styles.item__inerbody}>
                          <div className={styles.item__left}>
                            <button
                              className={styles.item__remove}
                              onClick={() => {
                                dispatch(removeFromCart({ itemId }));
                              }}
                            ></button>
                            <Link
                              to={{ pathname: `/${item.category}/${itemId}` }}
                              className={styles.item__link}
                            >
                              <img
                                className={styles.item__image}
                                src={`./${item.image}`}
                                alt={item.image}
                              />
                              <p className={styles.item__title}>{item.name}</p>
                            </Link>
                          </div>
                          <div className={styles.item__right}>
                            <div className={styles.item__controlers}>
                              <button
                                disabled={qty <= 1}
                                className={styles.item__take}
                                onClick={() => {
                                  dispatch(takeQty({ itemId }));
                                }}
                              ></button>
                              <p className={styles.item__qty}>{qty}</p>
                              <button
                                className={styles.item__add}
                                onClick={() => {
                                  dispatch(addQty({ itemId }));
                                }}
                              ></button>
                            </div>
                            <p className={styles.item__price}>{`$${item.price}`}</p>
                          </div>
                        </div>
                      );
                    })}
                </div>
                <div className={styles.items__total}>
                  <div className={styles.items__container}>
                    <article>
                      <p className={styles.items__price}>${totals.subtotal}</p>
                      <p className={styles.items__qty}>Total for {totals.totalQty} items</p>
                    </article>
                    <span className={styles.items_line}></span>
                    <button
                      className={`${buttonStyle.action__button} ${styles.items_checkout}`}
                      onClick={() => setOpen(true)}
                    >
                      Checkout
                    </button>
                  </div>
                </div>
              </div>

              {open && (
                <div className={styles.cart__popup}>
                  <div
                    className={styles.backdrop}
                    onClick={e => e.target === e.currentTarget && setOpen(false)}
                  ></div>
                  <div className={styles.popup} role="dialog" aria-modal="true">
                    <div className={styles.cart__popup__container}>
                      <button
                        className={styles.popup__close}
                        onClick={() => setOpen(false)}
                      ></button>
                      <div className={styles.popup__title}>{popupText}</div>
                      <span className={styles.items_line}></span>
                      <article>
                        <p className={styles.items__price}>${totals.subtotal}</p>
                        <p className={styles.items__qty}>Total for {totals.totalQty} items</p>
                      </article>
                      <div className={styles.popup__buttons}>
                        <button
                          className={`${buttonStyle.action__button} ${styles.popup__confirm}`}
                          onClick={() => {
                            dispatch(clearCart());
                            setOpen(false);
                          }}
                        >
                          Confirm
                        </button>
                        <button
                          className={`${buttonStyle.action__button} ${styles.popup__cancel}`}
                          onClick={() => setOpen(false)}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </section>
          ) : (
            <div className={styles.items__empty}>
              <img
                src="./img/cart-is-empty.png"
                alt="cart-is-empty"
                className={styles.items__empty__image}
              />
              <p className={styles.items__title}>Your cart is empty</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
