import styles from './CartPage.module.scss';
import backIcon from '../../../public/img/icons/arrows/arrow-left-icon.svg';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { CartItem } from '../../components/CartItem';

const CartPage = () => {
  const { cart, totalPrice } = useCart();
  const navigate = useNavigate();

  const goBack = () => {
    navigate('../');
  };

  return (
    <div className={styles.cart}>
      <div className={styles.cart__back} onClick={goBack}>
        <img src={backIcon} alt="back-icon" />
        <p>Back</p>
      </div>

      <h1 className={styles.title}>Cart</h1>

      <div className={styles.cart__list}>
        {cart.length < 1 ? (
          <p>Your cart is empty</p>
        ) : (
          <div className={styles.cart__content}>
            <div className={styles.cart__items}>
              {cart.map(cartProduct => (
                <CartItem key={cartProduct.id} product={cartProduct} />
              ))}
            </div>

            <div className={styles.cart__priceBlock}>
              <p className={styles.cart__price}>${totalPrice}</p>
              <p className={styles.cart__quantity}>
                Total for {cart.length} items
              </p>

              <button className={styles.cart__checkout}>Checkout</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
