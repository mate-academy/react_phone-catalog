import { useCart } from "../../contexts";
import { Button } from "../shared";
import { CartItem } from "./components/CartItem";
import styles from './CartPage.module.scss';
import { Icon } from "../shared/components/Icon/Icon";

export const CartPage = () => {
  const { items, getTotalPrice } = useCart();
  return (
    <>
      <div className={styles['cart__page']}>
          <div className={styles['cart__page__top']}>
            <Button variant="icon" noBorder><Icon name="arrow-left" />Back</Button>
            <h2 className={styles['cart__title']}>Cart</h2>
          </div>
        <div className={styles['cart']}>
          <ul className={styles['cart__list']}>
            {items.map((item) => (
              <CartItem key={item.product.itemId} item={item} />
            ))}
          </ul>
        </div>
        <div className={styles['cart__checkout']}>
          <h3 className={styles['cart__checkout-total-price']}>${getTotalPrice()}</h3>
          <h3 className={styles['cart__checkout-item-count']}>Total for {items.length} items</h3>
          <Button variant="primary" fullWidth className={styles['cart__checkout-button']}>
            Checkout
          </Button>
        </div>
      </div>
    </>
  );
};
