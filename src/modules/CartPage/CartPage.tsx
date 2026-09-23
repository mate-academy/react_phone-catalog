import { withBase } from '../../utils/withBase';
import { Link } from 'react-router-dom';
import { BackButton } from '../../components/BackButton';
import { IconClose, IconMinus, IconPlus } from '../../components/Icons';
import { useShop } from '../../context/ShopContext';
import styles from './CartPage.module.scss';

export const CartPage = () => {
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useShop();

  const totalQuantity = cart.reduce((acc, item) => {
    return acc + item.quantity;
  }, 0);

  const totalPrice = cart.reduce((acc, item) => {
    return acc + item.product.price * item.quantity;
  }, 0);

  const handleCheckout = () => {
    const shouldClearCart = window.confirm(
      'Checkout is not implemented yet. Do you want to clear the Cart?',
    );

    if (shouldClearCart) {
      clearCart();
    }
  };

  return (
    <div className={styles.page}>
      <BackButton />

      <h1 className={styles.title}>Cart</h1>

      {cart.length === 0 ? (
        <div className={styles.empty}>
          <p className={styles.emptyText}>Your cart is empty</p>

          <img
            src={withBase('/img/cart-is-empty.webp')}
            alt="Your cart is empty"
            className={styles.emptyImage}
          />
        </div>
      ) : (
        <div className={styles.content}>
          <ul className={styles.list}>
            {cart.map(item => (
              <li className={styles.item} key={item.product.id}>
                <button
                  type="button"
                  className={styles.remove}
                  aria-label="Remove from cart"
                  data-cy="cartDeleteButton"
                  onClick={() => removeFromCart(item.product.id)}
                >
                  <IconClose />
                </button>

                <Link
                  to={`/product/${item.product.itemId}`}
                  className={styles.imageLink}
                >
                  <img
                    src={withBase(item.product.image)}
                    alt={item.product.name}
                    className={styles.image}
                  />
                </Link>

                <Link
                  to={`/product/${item.product.itemId}`}
                  className={styles.name}
                >
                  {item.product.name}
                </Link>

                <div className={styles.quantity}>
                  <button
                    type="button"
                    className={styles.quantityButton}
                    aria-label="−"
                    onClick={() => decreaseQuantity(item.product.id)}
                    disabled={item.quantity === 1}
                  >
                    <IconMinus />
                  </button>

                  <span
                    className={styles.quantityValue}
                    data-cy="productQauntity"
                  >
                    {item.quantity}
                  </span>

                  <button
                    type="button"
                    className={styles.quantityButton}
                    aria-label="+"
                    onClick={() => increaseQuantity(item.product.id)}
                  >
                    <IconPlus />
                  </button>
                </div>

                <span className={styles.itemPrice}>
                  ${item.product.price * item.quantity}
                </span>
              </li>
            ))}
          </ul>

          <div className={styles.summary}>
            <span className={styles.total}>${totalPrice}</span>

            <span className={styles.totalLabel}>
              Total for {totalQuantity} {totalQuantity === 1 ? 'item' : 'items'}
            </span>

            <div className={styles.summaryDivider} />

            <button
              type="button"
              className={styles.checkout}
              onClick={handleCheckout}
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
