import styles from './CartPage.module.scss';
import { useNavigate } from 'react-router-dom';
import { useProductsContext } from '../../../../hook/useProductsContext';

export const CartPage = () => {
  const navigate = useNavigate();

  const { cartProducts, removeFromCart, changeQuantity, clearCart } =
    useProductsContext();

  const totalItems = cartProducts.reduce((total, cartItem) => {
    return total + cartItem.quantity;
  }, 0);

  const totalPrice = cartProducts.reduce((total, cartItem) => {
    return total + cartItem.product.price * cartItem.quantity;
  }, 0);

  function handleCheckout() {
    const isConfirmed = window.confirm(
      'Checkout is not implemented yet. Do you want to clear the Cart?',
    );

    if (isConfirmed) {
      clearCart();
    }
  }

  return (
    <div className={`${styles.cart} container`}>
      <div className={styles['back-to__prev-page']}>
        <button
          className={styles['back-to__prev-button']}
          onClick={() => navigate(-1)}
        >
          <img
            src="./img/arrLeft.png"
            alt=""
            className={styles['back-to__prev-icon']}
          />
          Back
        </button>
      </div>

      <h1 className={styles.cart__title}>Cart</h1>

      {cartProducts.length === 0 ? (
        <h2 className={styles['cart__empty-title']}>Your cart is empty</h2>
      ) : (
        <div className={styles.cart__content}>
          <div className={styles.cart__items}>
            {cartProducts.map(cartItem => (
              <div key={cartItem.product.id} className={styles.cart__item}>
                <button
                  type="button"
                  className={`${styles['cart__item-button--delete']}`}
                  onClick={() => removeFromCart(cartItem.product.id)}
                >
                  <img
                    src="./img/Close.png"
                    alt=""
                    className={styles['cart__item-icon']}
                  />
                </button>

                <div className={styles['cart__item-image']}>
                  <img
                    src={cartItem.product.image}
                    alt=""
                    className={styles['cart__item-img']}
                  />
                </div>

                <p className={styles['cart__item-name']}>
                  {cartItem.product.name}
                </p>

                <div className={styles['cart__item-counter']}>
                  <button
                    type="button"
                    className={styles['cart__item-button']}
                    onClick={() => changeQuantity(cartItem.product.id, -1)}
                    disabled={cartItem.quantity === 1}
                  >
                    <img
                      src="./img/Minus.png"
                      alt=""
                      className={styles['cart__item-icon']}
                    />
                  </button>

                  <p className={styles['cart__item-count']}>
                    {cartItem.quantity}
                  </p>

                  <button
                    type="button"
                    className={styles['cart__item-button']}
                    onClick={() => changeQuantity(cartItem.product.id, 1)}
                  >
                    <img
                      src="./img/Plus.png"
                      alt=""
                      className={styles['cart__item-icon']}
                    />
                  </button>
                </div>

                <p className={styles['cart__item-price']}>
                  {`$${cartItem.product.price * cartItem.quantity}`}
                </p>
              </div>
            ))}
          </div>

          <div className={styles.cart__summary}>
            <div>
              <h2 className={styles.cart__totalPrice}>{`$${totalPrice}`}</h2>

              <p
                className={styles.cart__totalItems}
              >{`Total for ${totalItems} items`}</p>
            </div>

            <hr className={styles.cart__line} />

            <button
              type="button"
              className={styles['cart__button--order']}
              onClick={() => handleCheckout()}
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
