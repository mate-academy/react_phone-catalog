import React, { useEffect, useState } from 'react';
import styles from './cart.module.scss';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../app/store';
import { addCase, decreaseCase, deleteCarts } from '../../features/cart';
import classNames from 'classnames';
import { Modal } from '../modal';
import { useNavigate } from 'react-router-dom';
import image from '../../../public/img/cart-is-empty.png';
import { Product } from '../../types/Product';

export const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const cartItem = useSelector((state: RootState) => state.cart.items);

  const deleteCartItem = (itemId: string | number) => {
    dispatch(deleteCarts(itemId));
  };

  const handleIncreaseQuantity = (itemId: string | number) => {
    dispatch(addCase(itemId));
  };

  const handleDecreaseQuantity = (itemId: string | number) => {
    dispatch(decreaseCase(itemId));
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isModalOpen]);

  const navigate = useNavigate();

  const back = () => {
    navigate(-1);
  };

  const handleItem = (seceltedProduct: Product) => {
    navigate(`/${seceltedProduct.category}/${seceltedProduct.itemId}`);
  };

  let items = 'item';

  if (cartItem.length > 1) {
    items = 'items';
  }

  return (
    <section className={classNames(styles.cart, 'container')}>
      <span onClick={back} className={styles.cart_back}>
        Back
      </span>
      <h1 className={styles.cart_title}>Cart</h1>
      {cartItem.length <= 0 ? (
        <img src={image} alt="empty bag" className={styles.cart_bcgImg} />
      ) : (
        <>
          <div className={styles.cart_mainCont}>
            <ul className={styles.cart_list}>
              {cartItem.map(cart => (
                <li key={cart.id} className={styles.cart_item}>
                  <div className={styles.cart_container1}>
                    <span
                      className={styles.cart_delete}
                      onClick={() => deleteCartItem(cart.id)}
                    ></span>
                    <img
                      src={cart.image}
                      alt={cart.name}
                      className={styles.cart_img}
                      onClick={() => handleItem(cart)}
                    />
                    <p className={styles.cart_name}>{cart.name}</p>
                  </div>
                  <div className={styles.cart_container2}>
                    <button
                      disabled={cart.quantity === 1}
                      onClick={() => handleDecreaseQuantity(cart.id)}
                      className={styles.cart_buttonDec}
                    ></button>
                    <span className={styles.cart_quantity}>
                      {cart.quantity}
                    </span>
                    <button
                      onClick={() => handleIncreaseQuantity(cart.id)}
                      className={styles.cart_buttonAdd}
                    ></button>
                    <p className={styles.cart_price}>
                      ${cart.price * cart.quantity}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <div className={styles.cart_shop}>
              <p className={styles.cart_shop_price}>
                $
                {cartItem.reduce(
                  (totalSum, item) => totalSum + item.quantity * item.price,
                  0,
                )}
              </p>
              <p className={styles.cart_shop_totalPrice}>
                {`Total for ${cartItem.reduce((totalSum, item) => totalSum + item.quantity, 0)} ${items}`}
              </p>
              <button
                type="button"
                className={styles.cart_checkout}
                onClick={() => setIsModalOpen(true)}
              >
                Checkout
              </button>
            </div>
          </div>
          <Modal onClose={setIsModalOpen} modal={isModalOpen} />
        </>
      )}
    </section>
  );
};
