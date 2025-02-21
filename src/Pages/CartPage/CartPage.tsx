import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { ButtonBack } from '../../components/ButtonBack/ButtonBack';
import { ItemInCart } from '../../components/ItemInCart/ItemInCart';
import cartSlice from '../../features/cart/cartSlice';
import styles from './CartPage.module.scss';

export const CartPage = () => {
  const { products } = useAppSelector(state => state.cart);
  const dispatch = useAppDispatch();

  const totalItems = products.reduce((acc, el) => {
    return acc + (el.quantity ?? 1);
  }, 0);

  const totalPrice = products.reduce((acc, el) => {
    return acc + (el.totalPrice ?? 1);
  }, 0);

  const checkout = () => {
    dispatch(cartSlice.actions.checkout());
  };

  return (
    <div className={styles.container}>
      <ButtonBack />
      <h1>Cart</h1>
      {products.length > 0 ? (
        <div className={styles.content}>
          <div className={styles.list}>
            {products.map(product => (
              <ItemInCart key={product.id} product={product} />
            ))}
          </div>
          <div className={styles.checkout}>
            <h2>${totalPrice}</h2>
            <p>Total for {totalItems} items</p>
            <span></span>
            <button onClick={checkout}>Checkout</button>
          </div>
        </div>
      ) : (
        <img
          className={styles.empty}
          src="/img/cart-is-empty.png"
          alt="empty-cart"
        />
      )}
    </div>
  );
};
