import emptyCart from "../../../../assets/img/cart-is-empty.png";

import styles from "./EmptyCart.module.scss";

export const EmptyCart = () => {
  return (
    <div className={styles.emptyBlock}>
      <h2>Your cart is empty</h2>
      <div className={styles.emptyBlockImage}>
        <img src={emptyCart} alt="Empty Cart" />
      </div>
    </div>
  );
};
