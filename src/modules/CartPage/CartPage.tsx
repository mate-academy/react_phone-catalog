import { FC } from 'react';
import Heading from '../../UI/Heading/Heading';
import { useProductStore } from '../../store/store';
import styles from './CartPage.module.css';
import CartItem from './components/CartItem';
import Button from '../../UI/Buttons/Button';

const CartPage: FC = () => {
  const cartItems = useProductStore(state => state.cartItems);
  const totalPrice = cartItems.reduce(
    (price, cartItem) => price + cartItem.priceDiscount,
    0,
  );

  return cartItems.length ? (
    <div className="container">
      <section className={styles.wrapper}>
        <Heading as="h1" className={styles.heading}>
          Cart
        </Heading>

        <div className="grid">
          <ul className={styles.list}>
            {cartItems.map(cartItem => (
              <li key={cartItem.id} className={styles.item}>
                <CartItem
                  product={cartItem}
                  onDelete={() => {}}
                  onMinus={() => {}}
                  onPlus={() => {}}
                />
              </li>
            ))}
          </ul>

          <div className={styles.info}>
            <Heading as="h2" className={styles.price}>
              ${totalPrice}
            </Heading>
            <p className={styles.descr}>Total for {cartItems.length} items</p>
            <Button variant="primary" className={styles.btn}>
              Checkout
            </Button>
          </div>
        </div>
      </section>
    </div>
  ) : (
    <div className={styles.error} />
  );
};

export default CartPage;
