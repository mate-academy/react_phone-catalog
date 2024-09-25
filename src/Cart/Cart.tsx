import React from 'react';
import { useCart } from '../UseCart/UseCart';
import styles from './Cart.module.scss';
import { useNavigate } from 'react-router-dom';

export const Cart: React.FC = () => {
  const { state, dispatch } = useCart();
  const totalItems = state.cart.reduce(
    (total, product) => total + (product.quantity || 1),
    0,
  );
  const totalPrice = state.cart.reduce((total, product) => {
    const price = Number(product.priceDiscount || product.priceRegular) || 0;

    return total + price * (product.quantity || 1);
  }, 0);

  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div>
      <button className={styles.button_back} onClick={handleBackClick}>
        Back
      </button>
      <h1 className={styles.title}>Cart</h1>
      <div className={styles.cartContainer}>
        {state.cart.length === 0 ? (
          <p className={styles.empty}>Your cart is empty</p>
        ) : (
          <div className={styles.cartGrid}>
            {state.cart.map(product => (
              <div key={product.id} className={styles.cartItem}>
                <button
                  className={styles.removeButton}
                  onClick={() =>
                    dispatch({
                      type: 'REMOVE_FROM_CART',
                      productId: product.id,
                    })
                  }
                >
                  ✕
                </button>

                <img
                  src={product.images[0]}
                  alt={product.name}
                  className={styles.productImage}
                />

                <div className={styles.productDetails}>
                  <h2>{product.name}</h2>
                </div>

                <div className={styles.quantityControl}>
                  <button
                    className={styles.quantityButton}
                    onClick={() =>
                      dispatch({
                        type: 'DECREASE_QUANTITY',
                        productId: product.id,
                      })
                    }
                  >
                    -
                  </button>
                  <span>{product.quantity}</span>
                  <button
                    className={styles.quantityButton}
                    onClick={() =>
                      dispatch({
                        type: 'INCREASE_QUANTITY',
                        productId: product.id,
                      })
                    }
                  >
                    +
                  </button>
                </div>

                <div className={styles.price}>
                  {product.priceDiscount ? (
                    <>
                      <span className={styles.discountPrice}>
                        ${product.priceDiscount}
                      </span>
                      <span className={styles.originalPrice}>
                        ${product.priceRegular}
                      </span>
                    </>
                  ) : (
                    <span className={styles.price}>
                      ${product.priceRegular}
                    </span>
                  )}
                </div>
              </div>
            ))}
            <div className={styles.checkout}>
              <div className={styles.totalPrice}>
                <span className={styles.totalPrice_span}>${totalPrice}</span>
              </div>
              <div className={styles.totalItems}>
                <span className={styles.totalItems_span}>
                  Total for {totalItems} items
                </span>
              </div>
              <button className={styles.checkoutButton}>Checkout</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
