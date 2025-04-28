import { useEffect, useState } from "react";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import Breadcrumbs from "../../shared/Breadcrumbs";
import styles from './CartPage.module.scss';
import CartItem from "./components/CartItem";
import { useLocation } from "react-router-dom";
import Loader from "../../shared/Loader";
import EmptyContent from "../../shared/EmptyContent";

const CartPage = () => {
  const items = useTypedSelector(state => state.cart.items);
  const { totalPrice } = useTypedSelector(state => state.cart);
  const countItemsInCart = items.reduce((total, item) => total + item.quantity, 0);
  const { pathname } = useLocation();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={styles.container}>
      <Breadcrumbs categoryName={pathname.slice(1)} />

      <h1>Cart</h1>

      {isLoading ? (
        <Loader />
      ) : items.length !== 0 ? (
        <div className={styles.main}>
          <div className={styles.main__items}>
            {items.map(item => (
              <CartItem item={item} />
            ))}
          </div>

          <div className={styles.main__price}>
            <h2>{`$${totalPrice}`}</h2>
            <h4>{`Total for ${countItemsInCart} items`}</h4>
            <div className={styles.line}></div>
            <button>Checkout</button>
          </div>
        </div>
      ) : (
        <EmptyContent title="Your cart is empty" img="/img/is-empty.png"/>
      )}

    </div>
  )
}

export default CartPage;
