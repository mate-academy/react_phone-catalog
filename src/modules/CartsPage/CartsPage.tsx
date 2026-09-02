import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useCart } from '../shared/context/CartContext';
import { useProducts } from '../shared/hooks/useProducts';
import styles from './CartsPage.module.scss';
import { Loader } from '../shared/components/Loader';
import { getPublicPath } from '../shared/utils/getPublicPath';

export const CartPage: React.FC = () => {
  const { products, loading, error } = useProducts();
  const { cart, dispatch } = useCart();
  const navigate = useNavigate();

  const cartItems = cart
    .map(cartItem => {
      const product = products.find(p => p.itemId === cartItem.id);

      if (!product) {
        return null;
      }

      return {
        ...product,
        quantity: cartItem.quantity,
      };
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = () => {
    const isConfirmed = window.confirm(
      'Checkout is not implemented yet. Do you want to clear the Cart?',
    );

    if (isConfirmed) {
      dispatch({ type: 'CLEAR_CART' });
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (error || !products) {
    return (
      <div className={styles.container}>
        <div className={styles.cartEmpty}>
          <p>Products not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.cart}>
        <button
          type="button"
          className={styles.cartBack}
          onClick={() => navigate(-1)}
        >
          <span className={styles.cartBackIcon}>
            <img src={getPublicPath('img/active-arrow.svg')} alt="arrow" />
          </span>
          <span className={styles.cartBackText}>Back</span>
        </button>

        <h1 className={styles.cartTitle}>Cart</h1>

        {cartItems.length === 0 ? (
          <div className={styles.cartEmpty}>
            <p>Your cart is empty</p>
          </div>
        ) : (
          <div className={styles.cartContent}>
            <div className={styles.cartList}>
              {cartItems.map(item => {
                const itemPrice = item.price;

                return (
                  <div key={item.itemId} className={styles.cartItem}>
                    <button
                      type="button"
                      className={styles.cartRemoveBtn}
                      onClick={() =>
                        dispatch({
                          type: 'REMOVE_PRODUCT',
                          payload: item.itemId,
                        })
                      }
                    >
                      ×
                    </button>

                    <NavLink
                      to={`/product/${item.itemId}`}
                      className={styles.cartProductLink}
                    >
                      <div className={styles.cartImageContainer}>
                        <img
                          src={`${getPublicPath(item.image)}`}
                          alt={item.name}
                          className={styles.cartImage}
                        />
                      </div>

                      <p className={styles.cartItemTitle}>{item.name}</p>
                    </NavLink>

                    <div className={styles.cartQuantityControls}>
                      <button
                        type="button"
                        className={styles.cartQuantityBtn}
                        disabled={item.quantity <= 1}
                        onClick={() =>
                          dispatch({
                            type: 'DECREASE_QUANTITY',
                            payload: item.itemId,
                          })
                        }
                      >
                        –
                      </button>
                      <span className={styles.cartQuantity}>
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        className={styles.cartQuantityBtn}
                        onClick={() =>
                          dispatch({
                            type: 'ADD_PRODUCT',
                            payload: item.itemId,
                          })
                        }
                      >
                        +
                      </button>
                    </div>

                    <span className={styles.cartPrice}>
                      ${itemPrice * item.quantity}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className={styles.cartCheckout}>
              <div className={styles.cartTotalPrice}>${totalAmount}</div>
              <div className={styles.cartTotalCount}>
                Total for {totalQuantity}{' '}
                {totalQuantity === 1 ? 'item' : 'items'}
              </div>

              <div className={styles.cartDivider} />

              <button
                type="button"
                className={styles.cartCheckoutBtn}
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
