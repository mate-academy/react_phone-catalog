import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { getImg } from '../../utils/getImageUrl';
import styles from './CartPage.module.scss';

export const CartPage = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, totalCount } = useCart();

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  const handleCheckout = () => {
    const confirmed = window.confirm(
      'Checkout is not implemented yet. Do you want to clear the Cart?',
    );

    if (confirmed) {
      cartItems.forEach(item => removeFromCart(item.id));
    }
  };

  return (
    <div className={styles.page}>
      <button className={styles.back} onClick={() => navigate(-1)}>
        <img src={getImg('/img/icons/arrow-left.svg')} alt="back" />
        <span>Back</span>
      </button>

      <h1 className={styles.title}>Cart</h1>

      {cartItems.length === 0 ? (
        <p className={styles.empty}>Your cart is empty</p>
      ) : (
        <div className={styles.content}>
          {/* Cart items */}
          <div className={styles.items}>
            {cartItems.map(item => (
              <div key={item.id} className={styles.item}>
                <div className={styles.itemLeft}>
                  <button
                    className={styles.removeBtn}
                    onClick={() => removeFromCart(item.id)}
                    aria-label="Remove"
                  >
                    <img src={getImg('/img/icons/close.svg')} alt="remove" />
                  </button>

                  <img
                    src={getImg(item.product.image)}
                    alt={item.product.name}
                    className={styles.itemImage}
                  />

                  <p className={styles.itemName}>{item.product.name}</p>
                </div>

                <div className={styles.itemRight}>
                  <div className={styles.quantity}>
                    <button
                      className={styles.quantityBtn}
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity === 1}
                    >
                      <img src={getImg('/img/icons/minus.svg')} alt="minus" />
                    </button>
                    <span className={styles.quantityValue}>
                      {item.quantity}
                    </span>
                    <button
                      className={styles.quantityBtn}
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <img src={getImg('/img/icons/plus.svg')} alt="plus" />
                    </button>
                  </div>

                  <p className={styles.itemPrice}>
                    ${item.product.price * item.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className={styles.total}>
            <div className={styles.totalInfo}>
              <p className={styles.totalPrice}>${totalPrice}</p>
              <p className={styles.totalCount}>Total for {totalCount} items</p>
            </div>
            <div className={styles.divider} />
            <button className={styles.checkout} onClick={handleCheckout}>
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
