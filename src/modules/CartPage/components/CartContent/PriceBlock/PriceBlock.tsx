import styles from './PriceBlock.module.scss';
import { useAppDispatch, useAppSelector } from '../../../../../app/store/hooks';
import * as actionCart from '../../../../../app/store/slices/cartSlice';

export const PriceBlock = () => {
  const dispatch = useAppDispatch();
  const {totalPrice, items} = useAppSelector(state => state.cart);

  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = () => {
    if (window.confirm('Checkout is not implement yet. Do you want to clear the Cart ?')) {
      dispatch(actionCart.clearCart());
    }
  };

  return (
    <div className={styles.priceBlock}>
      <div className={styles.priceBlockTotal}>
        <h2 className={styles.priceBlockPrice}>${totalPrice}</h2>
        <p className={styles.priceBlockItems}>{`Total for ${totalQuantity} items`}</p>
      </div>
      <button className={styles.priceBlockCheckout} onClick={handleCheckout}>
        Checkout
      </button>
    </div>
  )
}
