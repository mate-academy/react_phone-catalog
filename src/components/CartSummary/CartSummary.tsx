import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import styles from "./CartSummary.module.scss";

type Props = {
  setMessage: (msg: string | null) => void;
}


export const CartSummary: React.FC<Props> = ({ setMessage }) => {
  const { cartItems, clearCart } = useContext(CartContext);

  const totalSum = cartItems.reduce((acc, item) => {
    acc += item.product.fullPrice * item.quantity;

    return acc;
  }, 0);

  const totalQuantity = cartItems.reduce((acc, item) => {
    acc += item.quantity

    return acc;
  }, 0)

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      setMessage('Cart is empty');
      return;
    }

    clearCart();
    setMessage('Thank you for your purchase!');
  }


  return (
    <>
      <div className={styles["cart-summary"]}>
        <div className={styles["cart-summary__total"]}>
          <p className={styles["cart-summary__total__sum"]}>${totalSum}</p>
          <p className={styles["cart-summary__total__quantity"]}>Total for {totalQuantity} items</p>
        </div>
        <div className={styles["cart-summary__total__checkout"]}>
          <button
            className={styles["cart-summary__total__checkout__button"]}
            onClick={() => handleCheckout()}
          >
            <p className={styles["cart-summary__total__checkout__button__text"]}>Checkout</p>
          </button>
        </div>
      </div>
    </>
  )
}
