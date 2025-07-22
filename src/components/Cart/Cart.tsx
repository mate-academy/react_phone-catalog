import { useNavigate } from 'react-router-dom';
import styles from './Cart.module.scss';
import { CartItem } from '../CartItem';
import { useContext, useState } from 'react';
import { CartandFavContext } from '../CartandFavProvider';
import { EmptyPage } from '../EmptyPage';

export const Cart = () => {
  const { cart: products, setCart } = useContext(CartandFavContext);
  const itemsCounter = products.length;
  const totalPrice = products.reduce((acc, product) => acc + product.price, 0);
  const productsWithoutDuplicates = products.filter(
    (product, index, arr) => index === arr.findIndex(p => p.id === product.id),
  );
  const navigate = useNavigate();
  const [openedCheckout, setOpenedCheckout] = useState(false);

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  if (itemsCounter === 0) {
    return <EmptyPage title="Cart" text="Your cart is empty" />;
  }

  return (
    <main className={styles.page}>
      <div className={styles.pageContent}>
        <div className={styles.pageInfo_link} onClick={() => handleBack()}>
          <span>&lt;</span>
          <span>Back</span>
        </div>

        <h1 className={styles.pageInfo_title}>Cart</h1>

        <div className={styles.pageItems}>
          {openedCheckout && (
            <div className={styles.modalBackGround}>
              <div className={styles.checkoutWindow}>
                Checkout is not implemented yet. Do you want to clear the Cart?
                <div className={styles.checkoutWindow_buttons}>
                  <button
                    className={styles.checkoutWindow_button}
                    onClick={() => {
                      setCart([]);
                      setOpenedCheckout(false);
                    }}
                  >
                    Yes
                  </button>
                  <button
                    className={`${styles.checkoutWindow_button} ${styles.cancel}`}
                    onClick={() => setOpenedCheckout(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
          <div className={styles.pageItems_list}>
            {productsWithoutDuplicates.map(product => {
              const counter = products.filter(
                item => item.itemId === product.itemId,
              ).length;

              return (
                <CartItem
                  key={product.id}
                  product={product}
                  counter={counter}
                />
              );
            })}
          </div>
          <div className={styles.pageItems_checkout}>
            <div className={styles.pageItems_checkout_info}>
              <span className={styles.pageItems_checkout_info_price}>
                {`$${totalPrice}`}
              </span>
              <span className={styles.pageItems_checkout_info_text}>
                {`Total for ${itemsCounter} items`}
              </span>
            </div>
            <div className={styles.pageItems_checkout_line}></div>
            <button
              className={styles.pageItems_checkout_button}
              onClick={() => setOpenedCheckout(true)}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};
