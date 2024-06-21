import React, { useContext, useRef, useState } from 'react';
import Styles from './Cart.module.scss';
import { ContextApp } from '../../appContext/AppContext';
import { CartCard } from './cartCard';
import { ItemWithQuantity } from '../../types/ItemWithQuantity';

export const Cart: React.FC = () => {
  const { cart, setCart } = useContext(ContextApp);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const handleCloseDialog = () => {
    dialogRef.current?.close();
  };

  const handleCheckout = () => {
    dialogRef.current?.insertAdjacentElement;
  };

  const handleClearCart = () => {
    setCart([]);
    setTotalPrice(0);
    setTotalQuantity(0);
  };

  return (
    <div className={Styles.cart}>
      <h1 className={Styles.cart__title}>Cart</h1>

      <div className={Styles.cart__items_container}>
        {cart.length > 0 ? (
          cart.map(product => {
            return (
              <CartCard
                key={product.id}
                setTotalPrice={setTotalPrice}
                setTotalQuantity={setTotalQuantity}
                product={product as ItemWithQuantity}
              />
            );
          })
        ) : (
          <p className={Styles.cart__items__container__paragraph}>Your cart is empty</p>
        )}
      </div>

      {cart.length > 0 && (
        <div className={Styles.cart__sum_container}>
          <p className={Styles.cart__sum_container__total_price}>
            {`$${totalPrice}`}
          </p>

          <p
            className={Styles.cart__sum_container__paragraph}
          >{`Total for ${totalQuantity} items`}</p>

          <div className={Styles.cart__sum_container__separator}></div>

          <div
            onClick={handleCheckout}
            className={Styles.cart__sum_container__checkout}
          >
            Checkout
          </div>
        </div>
      )}

      <dialog className={Styles.cart__dialog} ref={dialogRef}>
        <button
          className={Styles.cart__dialog__button_close}
          onClick={handleCloseDialog}
        >
          Close
        </button>

        <h1 className={Styles.cart__dialog__title}>
          Checkout is not implemented yet. Do you want to clear the Cart?
        </h1>

        <button
          onClick={handleClearCart}
          className={Styles.cart__dialog__button_confirm}
        >
          Confirm
        </button>

        <button
          onClick={handleCloseDialog}
          className={Styles.cart__dialog__button_confirm}
        >
          Cancel
        </button>
      </dialog>
    </div>
  );
};
