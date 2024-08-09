import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  clearCartItems,
  selectCartItems,
} from '../../redux/slices/cartItemsSlice';
import classNames from 'classnames';
import { countItems } from '../../utils/countItems';
import { CartItem } from '../CartItem';
import styles from './ShoppingCart.module.scss';

export const ShoppingCart = () => {
  const cartItems = useAppSelector(selectCartItems);
  const dispatch = useAppDispatch();

  const [isModalActive, setIsModalActive] = useState<boolean>(false);
  const navigate = useNavigate();

  const totalItems = useMemo(() => countItems(cartItems), [cartItems]);

  const totalItemsText = useMemo(
    () =>
      totalItems !== 1 ? `Total for ${totalItems} items` : `Total for 1 item`,
    [totalItems],
  );

  const totalPrice = useMemo(
    () =>
      cartItems.reduce((sum, { quantity, product }) => {
        const { appliedPrice, fullPrice } = product;
        const cartPrice = appliedPrice || fullPrice;

        return sum + quantity * cartPrice;
      }, 0),
    [cartItems],
  );

  if (!cartItems.length) {
    return (
      <div className={styles.emptyCartBlock}>
        <button
          type="button"
          className={styles.btnBack}
          onClick={() => navigate(-1)}
        >
          Back
        </button>

        <p className={styles.emptyCartTxt}>Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className={styles.shoppingCart}>
      <div className={styles.container}>
        <button
          type="button"
          className={styles.btnBack}
          onClick={() => navigate(-1)}
        >
          Back
        </button>

        <h2 className={styles.title}>Cart</h2>

        <div className={styles.mainContent}>
          <div className={styles.cartItems}>
            {cartItems.map(cartItem => (
              <CartItem key={cartItem.id} cartItem={cartItem} />
            ))}
          </div>

          <div className={styles.totalWrapper}>
            <p className={styles.totalPrice}>{`$${totalPrice}`}</p>
            <p className={styles.totalItems}>{totalItemsText}</p>

            <div className={styles.hr} />

            <button
              type="button"
              className={styles.btnCheckout}
              onClick={() => setIsModalActive(true)}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>

      <div
        className={classNames(styles.modalDialog, {
          [styles.modalActive]: isModalActive,
        })}
      >
        <div className={styles.modalContainer}>
          <div className={styles.modalContent}>
            <p className={styles.modalInfo}>
              Checkout is not implemented yet.
              <br />
              Do you want to clear the Cart?
            </p>

            <div className={styles.modalButtons}>
              <button
                className={styles.modalBtn}
                onClick={() => dispatch(clearCartItems())}
              >
                Confirm
              </button>
              <button
                className={styles.modalBtn}
                onClick={() => setIsModalActive(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
