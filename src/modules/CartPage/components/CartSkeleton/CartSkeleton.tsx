import styles from './CartSkeleton.module.scss';

export const CartSkeleton = () => {
  return (
    <div className={styles.cart__item}>
      <div className={styles.cart__description}>
        <button className={styles.cart__itemDeleteBtn}></button>
        <div className={styles.cart__itemImage}></div>

        <p className={styles.cart__itemDescription}></p>
      </div>
      <div className={styles.cart__toPay}>
        <div className={styles.cart__itemControl}>
          <button className={styles.cart__minusBtn}></button>
          <p className={styles.cart__addedItems}></p>
          <button className={styles.cart__plusBtn}></button>
        </div>
        <h3 className={styles.cart__price}></h3>
      </div>
    </div>
  );
};
