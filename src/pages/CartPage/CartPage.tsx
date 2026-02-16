import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './CartPage.module.scss';
import { AppContext } from '../../AppContext';
import { CartItem } from '../../components';
import { ChevronArrowLeft } from '../../helpers/icons';

export const CartPage = () => {
  const { cart, setCart, CART_LOCAL_STORAGE_ITEM } =
    React.useContext(AppContext);
  const [quantity, setQuantity] = React.useState(0);
  const [totalPrice, setTotalPrice] = React.useState(0);

  const navigator = useNavigate();

  React.useEffect(() => {
    setQuantity(cart.reduce((acc, item) => acc + item.quantity, 0));
    setTotalPrice(
      cart.reduce((acc, item) => acc + item.quantity * item.product.price, 0),
    );
  }, [cart]);

  const handleCheckoutClick = () => {
    const checkoutResponse = confirm(
      'Checkout is not implemented yet. Do you want to clear the Cart?',
    );

    if (checkoutResponse) {
      setCart([]);
      localStorage.setItem(CART_LOCAL_STORAGE_ITEM, JSON.stringify([]));
    }
  };

  return (
    <section className={styles.container}>
      <button
        type="button"
        className={styles.back}
        onClick={() => navigator(-1)}
      >
        <ChevronArrowLeft />
        Back
      </button>

      <h1 className={styles.title}>Cart</h1>

      {!!cart.length ? (
        <div className={styles.wrapper}>
          <ul className={styles.list}>
            {cart.map(cartItem => (
              <li key={cartItem.id}>
                <CartItem cartItem={cartItem} />
              </li>
            ))}
          </ul>

          <div className={styles.checkoutContainer}>
            <div className={styles.sumWrapper}>
              <p className={styles.priceSum}>${totalPrice}</p>
              <p className={styles.totalProducts}>Total for {quantity} items</p>
            </div>

            <hr className={styles.line} />

            <button
              type="button"
              className={styles.checkoutButton}
              onClick={handleCheckoutClick}
            >
              Checkout
            </button>
          </div>
        </div>
      ) : (
        <p className={styles.emptyCartMessage}>Your cart is empty</p>
      )}
    </section>
  );
};
