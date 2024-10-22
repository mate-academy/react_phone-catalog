import { CartItem } from './components/CartItem/CartItem';
import styles from './CartPage.module.scss';
import { BackBtn } from '../../components/BackBtn';

import classNames from 'classnames';
import { Button } from '../../components/Button';
import { useShoppingCart } from '../../store/CartContext';
import { ModalDialog } from './components/ModalDialog';
import { useState } from 'react';

export const CartPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const { shoppingCartProducts, productQuantities, totalQuantity } =
    useShoppingCart();

  const sum = shoppingCartProducts.reduce(
    (acc, cur) => acc + cur.price * productQuantities[cur.itemId],
    0,
  );

  return (
    <div className={styles.cart}>
      <BackBtn />
      <h1>Cart</h1>
      {totalQuantity ? (
        <div className={styles.cart__wrapper}>
          <CartItem />

          <div className={styles.cart__checkout}>
            <h2 className={styles.cart__totalPrice}>${sum}</h2>
            <p className={classNames(styles.cart__quantity, 'text-body')}>
              Total for {totalQuantity} {totalQuantity === 1 ? 'item' : 'items'}
            </p>
            <div className={styles.cart__divider}></div>
            <div onClick={openModal} className={styles.cart__checkout__btn}>
              <Button text="Checkout" />
            </div>
          </div>
        </div>
      ) : (
        <>
          <h3 className={styles.cart__empty}>Your cart is empty</h3>
          <img
            src="img/cart-is-empty.png"
            alt="cart-is-empty"
            className={styles.cart__emptyImg}
          />
        </>
      )}
      <ModalDialog isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};
