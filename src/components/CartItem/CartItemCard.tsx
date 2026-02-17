import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { CartItem } from "../../modules/shared/types/CartItem";
import styles from "../CartItem/CartItemCard.module.scss";

interface CartItemProps {
  product: CartItem
}

export const CartItemCard: React.FC<CartItemProps> = ({ product }) => {
  const { removeFromCart, increment, decrement } = useContext(CartContext);
  const productItem = product.product;

  const handleRemoveFromCart = () => {
    removeFromCart(productItem.productId)
  }

  const handleIncrement = () => {
    increment(productItem.productId)
  }

  const handleDecrement = () => {
    decrement(productItem.productId)
  }

  const isMinQuantity = product.quantity === 1;

  return (
    <>
      <div className={styles["cart-item-card"]}>
          <div className={styles["cart-item-card__first"]}>
            <div className={styles["cart-item-card__first__block"]}>
              <button className={styles["cart-item-card__first__block__button"]} onClick={handleRemoveFromCart}>
                <svg
                  className={styles["cart-item-card__first__block__button__close"]}
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                >
                  <path d="M4 4L12 12M12 4L4 12" stroke="currentColor" strokeWidth="1" />
                </svg>
              </button>
            </div>
            <div className={styles["cart-item-card__first__photo-block"]}>
              <img className={styles["cart-item-card__first__photo-block__photo"]} src={productItem.image} alt={productItem.name}/>
            </div>
            <p className={styles["cart-item-card__first__name"]}>{productItem.name}</p>
          </div>
          <div className={styles["cart-item-card__second"]}>
            <div className={styles["cart-item-card__second__quantity-block"]}>
              <button
                className={isMinQuantity ? styles["cart-item-card__second__quantity-block__button--disabled"] : styles["cart-item-card__second__quantity-block__button"]}
                onClick={handleDecrement}
                disabled={isMinQuantity}
              >
                <svg
                  className={isMinQuantity ? styles["cart-item-card__second__quantity-block__button__minus--disabled"] : styles["cart-item-card__second__quantity-block__button__minus"]}
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                >
                  <path d="M3 8H13" stroke="currentColor" strokeWidth="1" />
                </svg>
              </button>
              <p className={styles["cart-item-card__second__quantity-block__quantity"]}>{product.quantity}</p>
              <button
                className={styles["cart-item-card__second__quantity-block__button"]}
                onClick={handleIncrement}
              >
                <svg
                  className={styles["cart-item-card__second__quantity-block__button__plus"]}
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                >
                  <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="1" />
                </svg>
              </button>
            </div>
            <p className={styles["cart-item-card__second__price"]}>${productItem.fullPrice * product.quantity}</p>
          </div>
      </div>
    </>
  )
}
