import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import styles from './CartPage.module.scss';
import { IoChevronForward } from 'react-icons/io5';
// eslint-disable-next-line max-len
import ConfirmationModal from '../../components/ConfirmationModal/ConfirmationModal';

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    totalItems,
    totalPrice,
    clearCart,
  } = useCart();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleGoBack = () => navigate(-1);

  const handleCheckout = () => {
    setIsModalOpen(true);
  };

  const handleConfirmCheckout = () => {
    clearCart();
    setIsModalOpen(false);
  };

  const handleCancelCheckout = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.cartPage}>
      <button onClick={handleGoBack} className={styles.backButton}>
        <IoChevronForward style={{ transform: 'rotate(180deg)' }} />
        <span>Back</span>
      </button>

      <h1 className={styles.title}>Cart</h1>

      {cart.length > 0 ? (
        <div className={styles.cartContent}>
          <div className={styles.cartItems}>
            {cart.map(item => (
              <div key={item.product.itemId} className={styles.cartItem}>
                <button
                  onClick={() => removeFromCart(item.product.itemId)}
                  className={styles.removeButton}
                  aria-label={`Remove ${item.product.name} from cart`}
                >
                  &times;
                </button>
                <img
                  src={`${import.meta.env.BASE_URL}${item.product.image}`}
                  alt={item.product.name}
                  className={styles.productImage}
                />
                <p className={styles.productName}>{item.product.name}</p>
                <div className={styles.quantityControl}>
                  <button
                    onClick={() =>
                      updateQuantity(item.product.itemId, item.quantity - 1)
                    }
                    disabled={item.quantity <= 1}
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() =>
                      updateQuantity(item.product.itemId, item.quantity + 1)
                    }
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
                <p className={styles.productPrice}>
                  ${item.product.price * item.quantity}
                </p>
              </div>
            ))}
          </div>

          <div className={styles.cartSummary}>
            <div className={styles.totalPrice}>
              <span className={styles.totalAmount}>${totalPrice}</span>
              <span
                className={styles.totalLabel}
              >{`Total for ${totalItems} items`}</span>
            </div>
            <hr className={styles.separator} />
            <button onClick={handleCheckout} className={styles.checkoutButton}>
              Checkout
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.emptyMessage}>
          <h2>Your cart is empty</h2>
          <p>Looks like you haven&apos;t added anything to your cart yet.</p>
          <Link to="/phones" className={styles.catalogButton}>
            Go to catalog
          </Link>
        </div>
      )}

      <ConfirmationModal
        isOpen={isModalOpen}
        message="Checkout is not implemented yet.
          Do you want to clear the Cart?"
        onConfirm={handleConfirmCheckout}
        onCancel={handleCancelCheckout}
      />
    </div>
  );
}
