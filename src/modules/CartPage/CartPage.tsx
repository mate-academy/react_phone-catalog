import { useContext } from "react";
import { CartItemCard } from "../../components/CartItem";
import { CartContext } from "../../context/CartContext";
import { BackButton } from "../../components/BackButton";
import styles from "./CartPage.module.scss";
import { CartSummary } from "../../components/CartSummary";

export const CartPage = () => {
  const { cartItems } = useContext(CartContext);

  return (
    <>
      <div className={styles["cart-page"]}>
        <BackButton />
        <h1>Cart</h1>
        <div className={styles["cart-page__items"]}>
          {cartItems.map((item) => (
            <CartItemCard product={item} key={item.product.productId}/>
          ))}
        </div>
        <CartSummary />
      </div>
    </>
  )
}
