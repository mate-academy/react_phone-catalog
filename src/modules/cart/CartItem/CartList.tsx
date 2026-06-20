import { useCart } from '../../../contexts/CartContext';
import styles from './CartList.module.scss';

export const CartItem = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
  } = useCart();

  const handleAddItem = (itemId: string) => {
    const findItemId = cart.find(item => item.product.id === itemId);
    const currentQuantity = findItemId ? findItemId.quantity : 0;
    const quantity = currentQuantity + 1;

    updateQuantity(itemId, quantity);
  };

  const handleRemoveItem = (itemId: string) => {
    const item = cart.find(cartItem => cartItem.product.id === itemId);

    if (item && item.quantity <= 1) {
      removeFromCart(itemId);
    } else if (item) {
      updateQuantity(itemId, item.quantity - 1);
    }
  };

  const handleCheckout = () => {
    const isConfirmed = window.confirm(
      'Checkout is not implemented yet. Do you want to clear the Cart?',
    );

    if (isConfirmed === true) {
      clearCart();
    }
  };

  if (cart.length === 0) {
    return (
      <div className={styles.errorWrapper}>
        <p className={styles.errorMessage}>Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className={styles.cart}>
      <div className={styles.cartContainer}>
        <div className={styles.cartList}>
          {cart.map(product => (
            <div key={product.product.id} className={styles.itemWrapper}>
              <div className={styles.itemDelete}>
                <button
                  onClick={() => removeFromCart(product.product.id)}
                  className={styles.deleteButton}
                >
                  <div className={styles.closeButton}>
                    <img
                      src="/img/icons/close.svg"
                      alt=""
                      className={styles.closeButtonImage}
                    />
                  </div>
                </button>
              </div>

              <div className={styles.itemImageWrapper}>
                <img
                  src={product.product.image}
                  alt={product.product.name}
                  className={styles.itemImage}
                />
              </div>

              <h2 className={styles.itemName}>{product.product.name}</h2>

              <div className={styles.itemQuantity}>
                <button
                  onClick={() => handleRemoveItem(product.product.id)}
                  className={styles.quantityButton}
                >
                  -
                </button>
                <span className={styles.quantityValue}>{product.quantity}</span>
                <button
                  onClick={() => handleAddItem(product.product.id)}
                  className={styles.quantityButton}
                >
                  +
                </button>
              </div>

              <div>
                <h3 className={styles.itemPrice}>${product.product.price}</h3>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.summary}>
          <h2 className={styles.summaryPrice}>${totalPrice}</h2>
          <p className={styles.summaryInfo}>Total for {totalItems} items</p>
          <button className={styles.checkoutButton} onClick={handleCheckout}>
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};
