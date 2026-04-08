import style from './CartPage.module.scss';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { useCart } from '../../context/CartContext';
import { CartItem } from './CartItem';
import { CartTotal } from './CartTotal';
import { useEffect, useState } from 'react';
import classNames from 'classnames';

export const CartPage = () => {
  const { cartItems, clearCart } = useCart();
  const [isCheckout, setIsCheckourt] = useState(false);

  const handleSetIsCheckout = () => setIsCheckourt(true);
  const handleClearCart = () => {
    setIsCheckourt(false);
    clearCart();
  };

  useEffect(() => {
    if (isCheckout) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isCheckout]);

  return (
    <div className={style.cartPage}>
      <div className={style.cartPage__containerBreadcrumbs}>
        <Breadcrumbs category="Cart" />
      </div>

      <h1 className={style.cartPage__title}>Cart</h1>

      {cartItems.length === 0 && (
        <div className={style.cartPage__emptiContainer}>
          <h2 className={style.cartPage__emptyTitle}>Your cart is empty</h2>
          <img
            className={style.cartPage__imageEmptycart}
            src="/img/cart-is-empty.webp"
            alt="empty cart"
          />
        </div>
      )}

      {cartItems.length !== 0 && (
        <>
          <div className={style.cartPage__itemContainer}>
            {cartItems.map(item => (
              <div key={item.id}>
                <CartItem item={item} />
              </div>
            ))}
          </div>

          <div className={style.cartPage__totalContainer}>
            <CartTotal handleSetIsCheckout={handleSetIsCheckout} />
          </div>

          <div
            className={classNames(style.cartPage__overlay, {
              [style['cartPage__overlay--visible']]: isCheckout,
            })}
          >
            <div
              className={classNames(style.cartPage__checkout, {
                [style['cartPage__checkout--visible']]: isCheckout,
              })}
            >
              <h3 className={style.cartPage__checkoutTitle}>
                Checkout is not implemented yet. Do you want to clear the Cart?
              </h3>

              <div className={style.cartPage__checkoutContainerButton}>
                <button
                  onClick={handleClearCart}
                  className={style.cartPage__checkoutButton}
                >
                  Ok
                </button>
                <button
                  onClick={() => setIsCheckourt(false)}
                  className={style.cartPage__checkoutButton}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
