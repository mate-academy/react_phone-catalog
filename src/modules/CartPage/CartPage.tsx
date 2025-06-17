import React from 'react';
import styles from './CartPage.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../../store/cartSlice';
import { RootState } from '../../store';
import { BackButton } from '../../components/BackButton';

export const CartPage: React.FC = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart);

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.product.priceDiscount * item.quantity,
    0,
  );

  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className={styles.cartPage}>
      <BackButton />
      <h1 className={styles.title}>Cart</h1>

      {cartItems.length === 0 ? (
        <p className={styles.empty}>Your cart is empty</p>
      ) : (
        <>
          <div className={styles.contentCart}>
            <ul className={styles.list}>
              {cartItems.map(({ product, quantity }) => (
                <li key={product.id} className={styles.item}>
                  <div className={styles.protuct}>
                    <button
                      className={styles.remove}
                      onClick={() => dispatch(removeFromCart(product.id))}
                    >
                      ✕
                    </button>
                    <img
                      src={product.image}
                      alt={product.name}
                      className={styles.image}
                    />
                    <h2 className={styles.name}>{product.name}</h2>
                  </div>
                  <div className={styles.controls}>
                    <div className={styles.quantityBlock}>
                      <button
                        className={styles.btn}
                        onClick={() =>
                          dispatch(
                            updateQuantity({
                              id: product.id,
                              quantity: quantity - 1,
                            }),
                          )
                        }
                        disabled={quantity <= 1}
                      >
                        -
                      </button>
                      <span className={styles.quantity}>{quantity}</span>
                      <button
                        className={styles.btn}
                        onClick={() =>
                          dispatch(
                            updateQuantity({
                              id: product.id,
                              quantity: quantity + 1,
                            }),
                          )
                        }
                      >
                        +
                      </button>
                    </div>
                    <p className={styles.price}>
                      ${product.priceDiscount * quantity}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <div className={styles.summary}>
              <p className={styles.totalPrice}>${totalPrice}</p>
              <p className={styles.total}>Total for {totalQuantity} items</p>
              <div className={styles.divider} />
              <button
                className={styles.clearButton}
                onClick={() => {
                  const confirmed = window.confirm(
                    'Checkout is not implemented yet. Clear cart?',
                  );

                  if (confirmed) {
                    // dispatch(clearCart())
                    alert('Cart cleared!');
                  }
                }}
              >
                Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
