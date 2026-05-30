import { useContext, useEffect, useState } from "react";
import { CartItemCard } from "../../components/CartItem";
import { CartContext } from "../../context/CartContext";
import { BackButton } from "../../components/BackButton";
import styles from "./CartPage.module.scss";
import { CartSummary } from "../../components/CartSummary";

export const CartPage = () => {
  const { cartItems } = useContext(CartContext);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!message) {
      return;
    }

    const id = setTimeout(() => setMessage(null), 3000);

    return () => clearTimeout(id);
  }, [message]);

  return (
    <>
      <div className={styles["cart-page"]}>
        <BackButton />
        <h1 className={styles["cart-page__title"]}>Cart</h1>
        <div className={styles["cart-page__content"]}>
          {message &&
            <div className={styles["cart-page__content__message"]}>
              <p className={styles["cart-page__content__message__text"]}>
                {message}
              </p>
            </div>
          }
          <div className={styles["cart-page__content__items"]}>
            {cartItems.map((item) => (
              <CartItemCard product={item} key={item.product.productId}/>
            ))}
          </div>
          <CartSummary setMessage={setMessage} />
        </div>
      </div>
    </>
  )
}
