import styles from './Cart.module.scss';

import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { home, arrowRight, plus, minus, del } from '../../icons';
import {
  decreaseQuantity,
  increaseQuantity,
  removeAllFromCart,
  removeFromCart,
} from '../features/cart';
import { ProductWithYear } from '../../types/product';

export const Cart = () => {
  const { cartItems } = useAppSelector(state => state.cart);
  const dispatch = useAppDispatch();

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.priceDiscount * (item.quantity || 1),
    0,
  );
  const totalItems = cartItems.reduce(
    (total, item) => total + (item.quantity || 1),
    0,
  );

  const handleDelete = (itemId: ProductWithYear) => {
    dispatch(removeFromCart(itemId));
  };

  const handleDecrease = (item: ProductWithYear) => {
    if (item.quantity && item.quantity > 1) {
      dispatch(decreaseQuantity(item));
    } else {
      dispatch(removeFromCart(item));
    }
  };

  const handleIncrease = (item: ProductWithYear) => {
    dispatch(increaseQuantity(item));
  };

  const handleCheckout = () => {
    if (
      window.confirm('Checkout not implemented yet, do you want to clear cart?')
    ) {
      localStorage.removeItem('cart');
      dispatch(removeAllFromCart());
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.navContainer}>
        <NavLink to="/">
          <img src={home} alt="home-icon" className={styles.homeIcon} />
        </NavLink>
        <img src={arrowRight} alt="arrow-right" className={styles.arrowIcon} />
        <p className={styles.location}>Cart</p>
      </div>
      <h1 className={styles.title}>Cart</h1>
      {cartItems.length > 0 ? (
        <div className={styles.cartWrapper}>
          <div className={styles.itemsContainer}>
            {cartItems.map(item => {
              return (
                <div key={item.id} className={styles.itemWrapper}>
                  <button
                    className={styles.delete}
                    onClick={() => handleDelete(item)}
                  >
                    <img src={del} alt="delete-icon" />
                  </button>
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className={styles.image}
                  />
                  <p className={styles.productName}>{item.name}</p>
                  <div className={styles.buttonsContainer}>
                    <button
                      className={styles.buttons}
                      onClick={() => handleDecrease(item)}
                    >
                      <img src={minus} alt="minus-icon" />
                    </button>
                    <p className={styles.numberItems}>
                      {item.quantity ? item.quantity : 1}
                    </p>
                    <button
                      className={styles.buttons}
                      onClick={() => handleIncrease(item)}
                    >
                      <img src={plus} alt="plus-icon" />
                    </button>
                  </div>
                  <p className={styles.price}>${item.priceDiscount}</p>
                </div>
              );
            })}
          </div>

          <div className={styles.checkoutContainer}>
            <div>
              <p className={styles.totalPrice}>${totalPrice}</p>
              <p className={styles.total}>Total for {totalItems} items</p>
            </div>
            <hr className={styles.line} />
            <button className={styles.checkoutButton} onClick={handleCheckout}>
              Checkout
            </button>
          </div>
        </div>
      ) : (
        <p className={styles.cartEmpty}>
          <p className={styles.cartEmptyTitle}>Cart is empty</p>
          <img
            src="/react_phone-catalog/img/product-not-found.png"
            alt="cart-is-empty"
            className={styles.emptyImg}
          />
        </p>
      )}
    </div>
  );
};
