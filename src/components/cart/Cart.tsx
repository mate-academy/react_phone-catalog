import React, { useContext, useRef, useState } from 'react';
import Styles from './Cart.module.scss';
import { ContextApp } from '../../appContext/AppContext';
import { CartCard } from './cartCard';
import { ItemWithQuantity } from '../../types/ItemWithQuantity';

export const Cart: React.FC = () => {
  const { cart } = useContext(ContextApp);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const closeDialog = () => {
    dialogRef.current?.close();
  };

  const handleCheckout = () => {
    dialogRef.current?.showModal();
  };

  return (
    <div className={Styles.cart}>
      <h1 className={Styles.cart__title}>Cart</h1>

      <div className={Styles.cart__items_container}>
        {cart.length > 0 &&
          cart.map(product => {
            return (
              <CartCard
                key={product.id}
                setTotalPrice={setTotalPrice}
                setTotalQuantity={setTotalQuantity}
                product={product as ItemWithQuantity}
              />
            );
          })}

        {cart.length === 0 && (
          <p className={Styles.cart__items__container__paragraph}>empty</p>
        )}
      </div>

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

        <dialog ref={dialogRef}>
          <button onClick={closeDialog}>Close</button>
          <h1>
            `Checkout is not implemented yet. Do you want to clear the Cart?`
          </h1>
        </dialog>
      </div>
    </div>
  );
};
