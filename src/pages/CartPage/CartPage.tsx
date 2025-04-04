import styles from './CartPage.module.scss';
import { useCart } from '../../context/CartContext';
import { CartItem } from '../../components/CartItem';
import { useState } from 'react';
import Modal from '../../components/Modal/Modal';
import emptyCartIcon from '/img/cart-is-empty.png';
import BackIcon from '../../components/BackIcon/BackIcon';

const EmptyCart = () => (
  <div className={styles.cart__empty}>
    <img src={emptyCartIcon} alt="empty cart" />
  </div>
);

const CartPage = () => {
  const { cart, totalPrice, cartLength, clearCart } = useCart();

  const [openModal, setOpenModal] = useState(false);

  const handleOpen = () => setOpenModal(true);

  const handleClose = () => setOpenModal(false);

  const handleClearCart = () => clearCart();

  return (
    <div className={styles.cart}>
      <BackIcon />

      <h1 className={styles.title}>Cart</h1>

      <div className={styles.cart__list}>
        {cart.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className={styles.cart__content}>
            <div className={styles.cart__items}>
              {cart.map(cartProduct => (
                <CartItem key={cartProduct.id} product={cartProduct} />
              ))}
            </div>

            <div className={styles.cart__priceBlock}>
              <p className={styles.cart__price}>${totalPrice}</p>
              <p className={styles.cart__quantity}>
                Total for {cartLength} items
              </p>

              <button className={styles.cart__checkout} onClick={handleOpen}>
                Checkout
              </button>

              <Modal
                openModal={openModal}
                handleClose={handleClose}
                handleClearCart={handleClearCart}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
