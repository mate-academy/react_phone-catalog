import { useNavigate } from 'react-router-dom';
import styles from './Cart.module.scss';
import { CartItem } from '../CartItem';
import { useAppSelector } from '../../utils/hooks';
import {
  clearCart,
  selectCartItems,
  selectTotalAmount,
  selectTotalQuantity,
} from '../../features/cart';
import { useDispatch } from 'react-redux';

export const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const totalAmount = useAppSelector(state => selectTotalAmount(state));
  const totalQuantity = useAppSelector(state => selectTotalQuantity(state));

  const productsInCart = useAppSelector(state => selectCartItems(state));

  const handleCheckout = () => {
    const isConfirmed = window.confirm(
      'Checkout is not implemented yet. Do you want to clear the Cart?',
    );

    if (isConfirmed) {
      dispatch(clearCart());
    }
  };

  return (
    <div className={styles.cart}>
      <div className={styles.cart__back__wrapper}>
        <button className={styles.cart__back} onClick={() => navigate(-1)}>
          Back
        </button>
      </div>

      <h1 className={styles.cart__title}>Cart</h1>

      {totalAmount > 0 ? (
        <>
          <div className={styles.cart__items}>
            {productsInCart.map(product => {
              return <CartItem key={product.id} product={product} />;
            })}
          </div>

          <div className={styles.cart__checkoutContainer}>
            <h2 className={styles.cart__price}>{`$${totalAmount}`}</h2>
            <h2 className={styles.cart__totalQuantity}>
              Total for {totalQuantity} items
            </h2>

            <div className={styles.cart__button}>
              <button
                className={styles.cart__checkout}
                onClick={handleCheckout}
              >
                Checkout
              </button>
            </div>
          </div>
        </>
      ) : (
        <h2 className={styles.cart__empty}>Your cart is empty..</h2>
      )}
    </div>
  );
};
