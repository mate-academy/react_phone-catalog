import styles from './Cart.module.scss';
import { useCart } from '../../contexts/CartContext';
import classNames from 'classnames';
import { Item } from '../../types/Item';

export const Cart = () => {
  const { cartItems, setCartItems, setCartItemsIds, totalAmount, totalQuantity } = useCart();

  const removeFromCart = (item: Item) => {
    setCartItems(prev => prev.filter(prevItem => prevItem.id !== item.id));
    setCartItemsIds(prev => prev.filter(prevId => prevId !== item.id));
  };

  const increaseQuantity = (item: Item) => {
    setCartItems(prev =>
      prev.map(x => (x.id === item.id ? { ...item, quantity: item.quantity + 1 } : item)),
    );
  };

  const decreaseQuantity = (item: Item) => {
    if (item.quantity === 1) {
      return;
    }

    setCartItems(prev =>
      prev.map(x => (x.id === item.id ? { ...item, quantity: item.quantity - 1 } : item)),
    );
  };

  const handleCheckout = () => {
    const confirmed = confirm('Checkout is not implemented yet. Do you want to clear the Cart?');

    if (confirmed) {
      setCartItems([]);
    }
  };

  return (
    <section className={styles.cart}>
      <div className={styles.cart__navigation}>
        <a href="/" className={styles.cart__arrowLeft}></a>
        <a href="/" className={styles.cart__linkBack}>
          Back
        </a>
      </div>

      <h1 className={styles.cart__title}>Cart</h1>

      {cartItems.length === 0 ? (
        <div className={styles.cart__emptyBox}>
          <p className={styles.cart__emptyMessage}>Your cart is empty!</p>
          <img
            src="public/img/icons/empty-cart.webp"
            alt="Empty cart"
            className={styles.cart__emptyPhoto}
          />
        </div>
      ) : (
        <div className={styles.cart__content}>
          <div className={styles.cart__list}>
            {cartItems.map(item => (
              <div className={styles.cart__item} key={item.id}>
                <a className={styles.cart__itemRemove} onClick={() => removeFromCart(item)}></a>
                <img src={item.images[0]} alt="Cart item" className={styles.cart__itemPhoto} />
                <p className={styles.cart__itemTitle}>{item.name}</p>

                <div className={styles.cart__itemQuantity}>
                  <button
                    className={classNames(styles.cart__quantityBtn, {
                      [styles['cart__quantityBtn--disabled']]: item.quantity === 1,
                    })}
                    onClick={() => decreaseQuantity(item)}
                  >
                    -
                  </button>
                  <p className={styles.cart__quantityValue}>{item.quantity}</p>
                  <button
                    className={styles.cart__quantityBtn}
                    onClick={() => increaseQuantity(item)}
                  >
                    +
                  </button>
                </div>

                <p className={styles.cart__itemPrice}>${item.priceDiscount}</p>
              </div>
            ))}
          </div>

          <div className={styles.cart__checkout}>
            <h2 className={styles.cart__checkoutAmount}>${totalAmount}</h2>
            <p className={styles.cart__checkoutQuantity}>Total for {totalQuantity} items</p>
            <button className={styles.cart__checkoutButton} onClick={() => handleCheckout()}>
              Checkout
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
