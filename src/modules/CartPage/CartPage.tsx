import styles from './CartPage.module.scss';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';

export const CartPage = () => {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    totalPrice,
    totalCount,
    clearCart,
  } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    const confirmed = confirm(
      'Checkout is not implemented yet. Do you want to clear the Cart?',
    );

    if (confirmed) {
      clearCart();
    }
  };

  return (
    <div className="container">
      <button className={styles.btnBack} onClick={() => navigate(-1)}>
        <img src="img/icons/arrow-left.svg" alt="arrow-left" />
        Back
      </button>

      <h1 className={styles.title}>Cart</h1>

      {cartItems.length === 0 && <p>Cart is empty</p>}

      {cartItems.length > 0 && (
        <div className={styles.page}>
          <div className={styles.list}>
            {cartItems.map(item => (
              <div key={item.product.id} className={styles.item}>
                <button
                  className={styles.btnRemove}
                  onClick={() => removeFromCart(item.product.id)}
                >
                  <img src="img/icons/close.svg" alt="Remove" />
                </button>

                <img
                  src={`${item.product.image}`}
                  alt=""
                  className={styles.image}
                />

                <p className={styles.name}>{item.product.name}</p>

                <div className={styles.quantityBlock}>
                  <button
                    className={styles.btnQuantity}
                    onClick={() =>
                      updateQuantity(item.product.id, item.quantity - 1)
                    }
                  >
                    <img src="img/icons/minus.svg" alt="Decrease" />
                  </button>

                  <p className={styles.quantity}>{item.quantity}</p>

                  <button
                    className={styles.btnQuantity}
                    onClick={() =>
                      updateQuantity(item.product.id, item.quantity + 1)
                    }
                  >
                    <img src="img/icons/plus.svg" alt="Increase" />
                  </button>
                </div>

                <p className={styles.price}>
                  ${item.product.price * item.quantity}
                </p>
              </div>
            ))}
          </div>

          <div className={styles.total}>
            <p className={styles.totalPrice}>${totalPrice}</p>
            <p className={styles.totalText}>
              Total for {totalCount} {totalCount === 1 ? 'item' : 'items'}
            </p>
            <div className={styles.line}></div>
            <button className={styles.btnCheckout} onClick={handleCheckout}>
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
