import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../../app/store';
import { addCase, decreaseCase, deleteCarts } from '../../../app/reducers/cart';
import { Modal } from '../Modal/Modal';
import imageEmpty from '../../../assets/img/cart-is-empty.png';
import styles from './CartPage.module.scss';

export const CartPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItem = useSelector((state: RootState) => state.cart.items);
  const [isModal, setIsModal] = useState(false);

  const totalQuantity = useMemo(
    () => cartItem.reduce((total, item) => total + item.quantity, 0),
    [cartItem],
  );

  const totalPrice = useMemo(
    () => cartItem.reduce((sum, item) => sum + item.quantity * item.price, 0),
    [cartItem],
  );

  const itemsLabel = totalQuantity === 1 ? 'item' : 'items';

  useEffect(() => {
    document.body.style.overflow = isModal ? 'hidden' : 'auto';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isModal]);

  return (
    <section className={'container'}>
      <div className={styles.cart}>
        <div className={styles.cart_backContainer}>
          <span onClick={() => navigate('..')} className={styles.cart_backText}>
            Back
          </span>
        </div>
        <h1 className={styles.cart_title}>Cart</h1>
        {cartItem.length === 0 ? (
          <img
            src={imageEmpty}
            alt="empty cart"
            className={styles.cart_emptyImg}
          />
        ) : (
          <>
            <div className={styles.cart_container}>
              <ul className={styles.cart_list}>
                {cartItem.map(
                  ({ id, image, name, quantity, price, category, itemId }) => (
                    <li key={id} className={styles.cart_item}>
                      <div className={styles.cart_containerDetails}>
                        <span
                          className={styles.cart_delete}
                          onClick={() => dispatch(deleteCarts(id))}
                        ></span>
                        <img
                          src={image}
                          alt={name}
                          className={styles.cart_img}
                          onClick={() => navigate(`/${category}/${itemId}`)}
                        />
                        <p className={styles.cart_name}>{name}</p>
                      </div>
                      <div className={styles.cart_containerCountPrice}>
                        <div className={styles.cart_buttons}>
                          <button
                            disabled={quantity === 1}
                            onClick={() => dispatch(decreaseCase(id))}
                            className={styles.cart_buttonSubtract}
                          ></button>
                          <span className={styles.cart_count}>{quantity}</span>
                          <button
                            onClick={() => dispatch(addCase(id))}
                            className={styles.cart_buttonAdd}
                          ></button>
                        </div>
                        <p className={styles.cart_price}>${price * quantity}</p>
                      </div>
                    </li>
                  ),
                )}
              </ul>
              <div className={styles.cart_order}>
                <p className={styles.cart_order_price}>${totalPrice}</p>
                <p className={styles.cart_order_totalPrice}>
                  {`Total for ${totalQuantity} ${itemsLabel}`}
                </p>
                <button
                  type="button"
                  className={styles.cart_checkout}
                  onClick={() => setIsModal(true)}
                >
                  Checkout
                </button>
              </div>
            </div>
            <Modal onClose={setIsModal} isModal={isModal} />
          </>
        )}
      </div>
    </section>
  );
};
