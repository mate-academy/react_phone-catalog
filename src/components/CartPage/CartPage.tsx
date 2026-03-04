import { useNavigate, Link } from 'react-router-dom';
import { Navigation } from '../Navigation/Navigation';
import { Footer } from '../Footer/Footer';
import { useCart } from '../../context/Cartcontext';
import styles from './CartPage.module.scss';
import arrowLeft from '../../items/arrow_left.png';
import plusIcon from '../../items/Plus.png';
import minusIcon from '../../items/Minus.png';
import closeIcon from '../../items/Close.png';

export const CartPage = () => {
  const navigate = useNavigate();
  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    totalPrice,
    totalItems,
  } = useCart();

  const handleCheckout = () => {
    const confirmed = window.confirm(
      'Checkout is not implemented yet. Do you want to clear the Cart?',
    );

    if (confirmed) {
      clearCart();
    }
  };

  return (
    <div className={styles.wrapper}>
      <Navigation />
      <main className={styles.page}>
        <div className={styles.container}>
          <div className={styles.inner}>
            <button
              className={styles.back_btn}
              onClick={() => navigate(-1)}
              type="button"
            >
              <img src={arrowLeft} alt="back" className={styles.back_icon} />
              Back
            </button>

            <h1 className={styles.title}>Cart</h1>

            {cartItems.length === 0 ? (
              <div className={styles.empty}>
                <p className={styles.empty_text}>Your cart is empty</p>
              </div>
            ) : (
              <div className={styles.layout}>
                {/* Cart items list */}
                <ul className={styles.items_list}>
                  {cartItems.map(item => (
                    <li key={item.id} className={styles.cart_item}>
                      <button
                        className={styles.remove_btn}
                        onClick={() => removeFromCart(item.id)}
                        aria-label="Remove item"
                        type="button"
                      >
                        <img
                          src={closeIcon}
                          alt="remove"
                          style={{ width: 16, height: 16 }}
                        />
                      </button>

                      <img
                        className={styles.item_img}
                        src={item.product.image}
                        alt={item.product.name}
                      />

                      <Link
                        to={`/product/${item.id}`}
                        className={styles.item_name}
                      >
                        {item.product.name}
                      </Link>

                      <div className={styles.quantity_controls}>
                        <button
                          className={styles.qty_btn}
                          onClick={() => decreaseQuantity(item.id)}
                          disabled={item.quantity <= 1}
                          type="button"
                          aria-label="Decrease quantity"
                        >
                          <img
                            src={minusIcon}
                            alt="-"
                            style={{ width: 16, height: 16 }}
                          />
                        </button>
                        <span className={styles.qty_value}>
                          {item.quantity}
                        </span>
                        <button
                          className={styles.qty_btn}
                          onClick={() => increaseQuantity(item.id)}
                          type="button"
                          aria-label="Increase quantity"
                        >
                          <img
                            src={plusIcon}
                            alt="+"
                            style={{ width: 16, height: 16 }}
                          />
                        </button>
                      </div>

                      <span className={styles.item_price}>
                        ${item.product.price * item.quantity}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Order summary */}
                <div className={styles.summary}>
                  <p className={styles.summary_price}>${totalPrice}</p>
                  <p className={styles.summary_count}>
                    Total for {totalItems} {totalItems === 1 ? 'item' : 'items'}
                  </p>
                  <div className={styles.summary_divider} />
                  <button
                    className={styles.checkout_btn}
                    onClick={handleCheckout}
                    type="button"
                  >
                    Checkout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
