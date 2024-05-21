import styles from './CheckoutInformation.module.scss';

export const CheckoutInformation = () => {
  return (
    <div className={styles.checkout_information}>
      <div className={styles.checkout_information__wrapper}>
        <div className={styles.checkout_information__box}>
          <h2 className={styles.checkout_information__price}>$2657</h2>
          <p className={styles.checkout_information__total}>
            Total for 3 items
          </p>
        </div>
        <div className={styles.checkout_information__button}>
          <button className={styles.checkout_information__btn}>Checkout</button>
        </div>
      </div>
    </div>
  );
};
