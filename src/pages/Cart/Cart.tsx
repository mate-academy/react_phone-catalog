import { useNavigate } from 'react-router-dom';
import styles from './Cart.module.scss';
import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';

export const Cart = () => {
  const { cart, clearCart, updateQuantity, removeFromCart } =
    useContext(CartContext);
  const totalItems = cart.reduce(
    (sum: number, item: any) => sum + item.quantity,
    0,
  );
  const totalPrice = cart.reduce((sum: number, item: any) => {
    const actualPrice = item.product.priceDiscount || item.product.price;
    return sum + actualPrice * item.quantity;
  }, 0);
  const handleCheckout = () => {
    const isConfirmed = window.confirm(
      'Checkout is not implemented yet. Do you want to clear the Cart?',
    );
    if (isConfirmed) {
      clearCart();
    }
  };
  const navigate = useNavigate();
  return (
    <div className={styles.cartBlock}>
      <div className={styles.backButton}>
        <button onClick={() => navigate(-1)} className={styles.backBtn}>
          <img src="/img/icons/rightWhiteArrow.png" alt="back" />
          <span>Back</span>
        </button>
      </div>
      <h1 className={styles.title}>Cart</h1>

      <div className={styles.cartContent}>
        <div className={styles.gridItems}>
          {cart.length === 0 ? (
            <h2 className={styles.emptyCartMessage}>Your cart is empty</h2>
          ) : (
            cart.map((item: any) => {
              const actualPrice =
                item.product.priceDiscount || item.product.price;
              const rawImage = item.product.images?.length
                ? item.product.images[0]
                : item.product.image;
              const finalImage = rawImage?.startsWith('http')
                ? rawImage
                : `/${rawImage}`;

              return (
                <div key={item.id} className={styles.cartItem}>
                  <div className={styles.itemTop}>
                    <button
                      className={styles.removeButton}
                      onClick={() => removeFromCart(item.id)}
                    >
                      ✕
                    </button>
                    <div className={styles.itemImageWrapper}>
                      <img
                        src={finalImage}
                        alt={item.product.name}
                        className={styles.itemImage}
                      />
                    </div>
                    <p className={styles.itemName}>{item.product.name}</p>
                  </div>

                  <div className={styles.itemBottom}>
                    <div className={styles.quantityControls}>
                      <button
                        className={styles.qtyButton}
                        onClick={() => updateQuantity(item.id, -1)}
                        disabled={item.quantity <= 1}
                      >
                        <img src="./img/icons/Minus.png" alt="minus" />
                      </button>
                      <span className={styles.qtyValue}>{item.quantity}</span>
                      <button
                        className={styles.qtyButton}
                        onClick={() => updateQuantity(item.id, 1)}
                      >
                        <img src="./img/icons/Plus.png" alt="plus" />
                      </button>
                    </div>
                    <p className={styles.itemPrice}>
                      ${actualPrice * item.quantity}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {cart.length > 0 && (
          <div className={styles.totalBlock}>
            <div className={styles.totalInfo}>
              <h2 className={styles.totalPrice}>${totalPrice}</h2>
              <p className={styles.totalItems}>Total for {totalItems} items</p>
            </div>

            <div className={styles.checkoutBlock}>
              <div className={styles.divider}></div>
              <button
                className={styles.checkoutButton}
                onClick={handleCheckout}
              >
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
