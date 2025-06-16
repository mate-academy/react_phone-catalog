import { useState } from 'react';
import { CartCard } from '../../../../components/CartCard';
import { useProducts } from '../../../../context/ProductsContext';
import styles from './CartList.module.scss';

export const CartList = () => {
  const { cart, setCart } = useProducts();
  const [itemsAmount, setItemsAmount] = useState(() => {
    return cart.reduce((sum, item) => {
      return sum + item.amount;
    }, 0);
  });
  const [totalPrice, setTotalPrice] = useState(
    cart.reduce((accumulator, currentProduct) => {
      return accumulator + currentProduct.price * currentProduct.amount;
    }, 0),
  );

  const [showModal, setShowModal] = useState(false);

  const handleCheckoutClick = () => {
    setShowModal(true);
  };

  const handleClearCart = () => {
    setCart([]);
    setShowModal(false);
    localStorage.setItem('cart', JSON.stringify([]));
  };

  return (
    <div className={styles.cart}>
      <div className={styles.cart__list}>
        {cart.map(card => {
          return (
            <CartCard
              key={card.id}
              card={card}
              setTotal={setTotalPrice}
              setItemsAmount={setItemsAmount}
            />
          );
        })}
      </div>

      <div className={styles.cart__checkout}>
        <div className={styles.cart__checkout__total}>${totalPrice}</div>
        <div className={styles.cart__checkout__items_amount}>
          Total for {itemsAmount} items
        </div>
        <div
          className={styles.cart__checkout__btn}
          onClick={handleCheckoutClick}
        >
          Checkout
        </div>
        <>
          {showModal && (
            <div className={styles.checkbox_notification}>
              <div className={styles.checkbox_notification__container}>
                <p className={styles.checkbox_notification__container__title}>
                  Checkout is not implemented yet. Do you want to clear the
                  Cart?
                </p>
                <div className={styles.checkbox_notification__container__btns}>
                  <div
                    onClick={handleClearCart}
                    className={
                      styles.checkbox_notification__container__btns__btn
                    }
                  >
                    Clear
                  </div>
                  <div
                    onClick={() => setShowModal(false)}
                    className={
                      styles.checkbox_notification__container__btns__btn
                    }
                  >
                    Cancel
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      </div>
    </div>
  );
};
