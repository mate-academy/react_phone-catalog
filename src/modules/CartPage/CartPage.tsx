import { useNavigate } from 'react-router-dom';
import s from './CartPage.module.scss';
import arrow from '../../assets/images/icons/Chevron (Arrow Left).svg';
import emptyCartImg from '../../../public/img/cart-is-empty.png';
import { useCart } from '../../hooks/ContextHook';
import { CartItem } from '../../components/CartItem/CartItem';

export const CartPage = () => {
  const navigate = useNavigate();
  const { cartItems, totalPrice, totalItems, clearCart } = useCart();

  const handleCheckout = () => {
    const result = confirm('Checkout is not implemented yet. Do you want to clear the Cart?');

    if (result) {
      clearCart();
    }
  };
  return (
    <div className={s.content}>
      <button className={s.backButton} onClick={() => navigate(-1)}>
        <img className={s.backImg} src={arrow} alt="arrow" aria-hidden="true" />
        <span className={s.backLabel}>Back</span>
      </button>

      <h1 className={s.title}>Cart</h1>
      {cartItems.length > 0 ? (
        <div className={s.container}>
          <div className={s.itemList}>
            {cartItems.map((item) => (
              <CartItem item={item} key={item.id} />
            ))}
          </div>

          <div className={s.cartResult}>
            <h2 className={s.totalPrice}>${totalPrice}</h2>
            <span className={s.itemCount}>
              Total for {totalItems} {totalItems === 1 ? 'item' : 'items'}
            </span>
            <button className={s.resultButton} onClick={handleCheckout}>
              Checkout
            </button>
          </div>
        </div>
      ) : (
        <div className={s.emptyState}>
          <img src={emptyCartImg} alt="Empty shopping cart" className={s.emptyImg} />
          <h2>Your cart is empty!!!</h2>
        </div>
      )}
    </div>
  );
};
