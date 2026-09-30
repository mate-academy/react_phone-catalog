import styles from './CartPage.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

export const CartPage: React.FC = () => {
  const navigate = useNavigate();

  const {
    cart,
    removeFromCart,
    changeQuantity,
    clearCart,
    totalPrice,
    totalCount,
  } = useCart();

  const handleCheckout = () => {
    const isConfirmed = window.confirm(
      'Checkout is not implemented yet. Do you want to clear the Cart?',
    );

    if (isConfirmed) {
      clearCart();
    }
  };

  if (cart.length === 0) {
    return (
      <div className={styles.cartPage}>
        <div className={styles.emptyCart}>
          <h2>Your cart is empty</h2>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.cartPage}>
      <button
        type="button"
        className={styles.backButton}
        onClick={() => navigate(-1)}
        data-cy="backButton"
      >
        <img src="./img/icons/arrow-left.svg" alt="" aria-hidden="true" />
        <span>Back</span>
      </button>

      <h1 className={styles.title}>Cart</h1>

      <div className={styles.content}>
        <div className={styles.itemList}>
          {cart.map(({ id, product, quantity }) => {
            const imagePath = product.image.startsWith('/')
              ? product.image
              : `/${product.image}`;

            return (
              <div key={id} className={styles.cartItem}>
                <div className={styles.productInfo}>
                  <button
                    type="button"
                    className={styles.removeBtn}
                    onClick={() => removeFromCart(id)}
                    data-cy="cartDelete"
                    aria-label="Remove item"
                  >
                    <img
                      src="./img/icons/close-grey.svg"
                      alt=""
                      aria-hidden="true"
                    />
                  </button>

                  <Link
                    to={`/products/${product.itemId}`}
                    className={styles.itemImageWrapper}
                  >
                    <img
                      src={imagePath}
                      alt={product.name}
                      className={styles.itemImage}
                    />
                  </Link>

                  <Link
                    to={`/products/${product.itemId}`}
                    className={styles.itemName}
                  >
                    {product.name}
                  </Link>
                </div>

                <div className={styles.quantityInfo}>
                  {' '}
                  <div className={styles.productQuantity}>
                    <button
                      type="button"
                      className={styles.quantityBtn}
                      onClick={() => changeQuantity(id, quantity - 1)}
                      disabled={quantity === 1}
                      data-cy="productQuantity"
                      aria-label="Decrease quantity"
                    >
                      <img
                        src={
                          quantity === 1
                            ? './img/icons/minus-disabled.svg'
                            : './img/icons/minus-active.svg'
                        }
                        alt=""
                        aria-hidden="true"
                      />
                    </button>
                    <span className={styles.quantityValue}>{quantity}</span>
                    <button
                      type="button"
                      className={styles.quantityBtn}
                      onClick={() => changeQuantity(id, quantity + 1)}
                      aria-label="Increase quantity"
                    >
                      <img
                        src="./img/icons/plus-active.svg"
                        alt=""
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                  <div className={styles.itemPrice}>
                    {`$${product.price * quantity}`}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className={styles.checkoutBlock}>
          <div className={styles.totalPrice}>{`$${totalPrice}`}</div>
          <div className={styles.totalCount}>
            {`Total for ${totalCount} items`}
          </div>
          <div className={styles.divider} />
          <button
            type="button"
            className={styles.checkoutBtn}
            onClick={handleCheckout}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};
