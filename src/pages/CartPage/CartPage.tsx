import styles from './CartPage.module.scss';
import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { BackButton } from '../../components/BackButton';
import { ErrorComponent } from '../../components/ErrorComponent';
import { baseUrl } from '../../utils/ts/baseURL';

export const CartPage = () => {
  const { cart, handleCart, clearCart, updateQuantity, error } =
    useContext(AppContext)!;
  const totalPrice = cart?.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );
  const totalQuantity = cart?.reduce((total, item) => total + item.quantity, 0);

  const handleCheckout = () => {
    const result = confirm(
      'Checkout is not implemented yet. Do you want to clear the Cart?',
    );

    if (result) {
      clearCart();
    }
  };

  if (error) {
    return <ErrorComponent />;
  }

  return (
    <div className={`${styles.cart__page} container`}>
      <BackButton />

      <h1 className={styles.cart__title}>Cart</h1>

      {cart.length > 0 && (
        <div className={styles.cart}>
          <div className={styles.cart__cardsContainer}>
            {cart.map(({ product, quantity }, index) => (
              <div className={styles.cart__card} key={index}>
                <div className={styles.cart__cardTop}>
                  <a
                    className={styles.cart__cardDelete}
                    onClick={() => handleCart && handleCart(product)}
                  ></a>

                  <img
                    src={`${baseUrl}/${product.image}`}
                    className={styles.cart__cardImage}
                    alt={`Image of ${product.name}`}
                  />

                  <span className={styles.cart__cardName}>{product.name}</span>
                </div>

                <div className={styles.cart__cardBottom}>
                  <div className={styles.cart__buttonsSection}>
                    <button
                      className={`${styles.cart__button} ${styles.cart__buttonMinus}`}
                      onClick={() =>
                        updateQuantity && updateQuantity(product.itemId, -1)
                      }
                    ></button>

                    <span>{quantity}</span>

                    <button
                      className={`${styles.cart__button} ${styles.cart__buttonPlus}`}
                      onClick={() =>
                        updateQuantity && updateQuantity(product.itemId, 1)
                      }
                    ></button>
                  </div>

                  <div className={styles.cart__priceContainer}>
                    <h3 className={styles.cart__cardPrice}>
                      ${product.price * quantity}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.cart__summary}>
            <h2 className={styles.cart__totalPrice}>${totalPrice}</h2>

            <span className={styles.cart__totalItems}>
              Total for {totalQuantity} item{totalQuantity === 1 ? '' : 's'}
            </span>

            <div className={styles.cart__splitter} />

            <button className={styles.cart__checkout} onClick={handleCheckout}>
              Checkout
            </button>
          </div>
        </div>
      )}

      {cart.length === 0 && (
        <>
          <h3 className={`${styles.cart__emptyTitle}`}>Your cart is empty</h3>
          <div className={styles.cart__emptyContainer}>
            <img
              className={styles.cart__emptyImg}
              src={`${baseUrl}/img/cart-is-empty.png`}
              alt="Page not found image"
            />
          </div>
        </>
      )}
    </div>
  );
};
