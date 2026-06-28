import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../../app/store/store';
import { addCase, decreaseCase, deleteCarts } from '../../../app/reducers/cart';
import { ModalWindow } from '../ModalWindow/ModalWindow';
import styles from './CartPage.module.scss';
import cartIsEmpty from '../../../images/other_images/cart-is-empty.png';

export const CartPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const totalQuantity = useMemo(
    () => cartItems.reduce((total, item) => total + item.quantity, 0),
    [cartItems],
  );

  const totalPrice = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity * item.price, 0),
    [cartItems],
  );

  const itemsLabel = totalQuantity === 1 ? 'item' : 'items';

  useEffect(() => {
    document.body.style.overflow = isModalOpen ? 'hidden' : 'auto';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isModalOpen]);

  const handleGoBack = () => navigate('..');
  const hanndleCkeckOut = () => setIsModalOpen(true);

  return (
    <section className="container">
      <div className={styles.cart}>
        <div className={styles.cart_backContainer}>
          <span onClick={handleGoBack} className={styles.cart_backText}>
            Back
          </span>
        </div>

        <h1 className={styles.cart_title}>Cart</h1>

        {cartItems.length === 0 ? (
          <img
            src={cartIsEmpty}
            alt="Empty cart"
            className={styles.cart_emptyImg}
          />
        ) : (
          <>
            <div className={styles.cart_container}>
              <ul className={styles.cart_list}>
                {cartItems.map(item => (
                  <li key={item.id} className={styles.cart_item}>
                    <div className={styles.cart_containerDetails}>
                      <span
                        className={styles.cart_delete}
                        onClick={() => dispatch(deleteCarts(item.id))}
                      ></span>
                      <img
                        src={item.image}
                        alt={item.name}
                        className={styles.cart_img}
                        onClick={() =>
                          navigate(`/${item.category}/${item.itemId}`)
                        }
                      />
                      <p
                        className={styles.cart_name}
                        onClick={() =>
                          navigate(`/${item.category}/${item.itemId}`)
                        }
                      >
                        {item.name}
                      </p>
                    </div>
                    <div className={styles.cart_containerCountPrice}>
                      <div className={styles.cart_buttons}>
                        <button
                          disabled={item.quantity === 1}
                          onClick={() => dispatch(decreaseCase(item.id))}
                          className={styles.cart_buttonSubtract}
                        ></button>
                        <span className={styles.cart_count}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => dispatch(addCase(item.id))}
                          className={styles.cart_buttonAdd}
                        ></button>
                      </div>
                      <p className={styles.cart_price}>
                        ${item.price * item.quantity}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className={styles.cart_order}>
                <p className={styles.cart_order_price}>${totalPrice}</p>
                <p className={styles.cart_order_totalPrice}>
                  {`Total for ${totalQuantity} ${itemsLabel}`}
                </p>
                <button
                  type="button"
                  className={styles.cart_checkout}
                  onClick={hanndleCkeckOut}
                >
                  Checkout
                </button>
              </div>
            </div>
            <ModalWindow onClose={setIsModalOpen} isModal={isModalOpen} />
          </>
        )}
      </div>
    </section>
  );
};
