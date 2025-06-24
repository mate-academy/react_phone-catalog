import { getTotalItemsCart } from '../../../../components/utils/getTotalItemsCart';
import styles from './Checkout.module.scss'
import { clearAllCartItem } from '../../../../features/CartSlice';
import { useAppDispatch } from '../../../../app/hooks';
export const Checkout = ({ products }) => {
  const dispach = useAppDispatch();
  const totalItems = getTotalItemsCart(products);

const totalPrice = products.reduce((sum,item)=>sum+(item.price* item.quantity),0)
  return (<>
  <div className={styles.checkout}>
      <div className={styles.checkout__total}>
        <h2 className={styles.checkout__price}>${totalPrice }</h2>
        <p className={styles.checkout__totalCount}>{`Total for ${totalItems } items` }</p>
      </div>
      <div className={styles.checkout__border}>
      <div className={styles.checkout__button} onClick={()=>dispach(clearAllCartItem())}>Checkout</div></div>
    </div></>)
}
