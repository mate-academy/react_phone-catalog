import styles from './CartTotalSkeleton.module.scss';

export const CartTotalSkeleton = () => {
  return (
    <div className={styles.cart__totalPrice}>
      <ul className={styles.cart__listItems}>
        <li className={styles.cart__listItemPrice}></li>
        <li className={styles.cart__listItemInfo}></li>
      </ul>
      <span className={styles.cart__line}></span>
      <button className={styles.cart__checkout}></button>
    </div>
  );
};
