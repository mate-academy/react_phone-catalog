import styles from './Checkout.module.scss'

export const Checkout = ({products}) => {
  const totalItems = products.reduce((sum, item) => sum + item.quantity,0);

const totalPrice = products.reduce((sum,item)=>sum+(item.priceDiscount * item.quantity),0)
  return (<>
  <div className={styles.checkout}>
      <div className={styles.checkout__total}>
        <h2 className={styles.checkout__price}>${totalPrice }</h2>
        <p className={styles.checkout__totalCount}>{`Total for ${totalItems } items` }</p>
      </div>
      <div className={styles.checkout__border}>
      <div className={styles.checkout__button}>Checkout</div></div>
    </div></>)
}
