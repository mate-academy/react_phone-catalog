import { useAppSelector } from '../../hooks/useAppSelector';
import { CartItem } from '../CartItem/CartItem';
import styles from './CartItems.module.scss';

export const CartItems = () => {
  const { cart } = useAppSelector(state => state.cart);

  return (
    <div className={styles.wrapper}>
      {cart.map(({ id, product, quantity }) => (
        <CartItem
          id={id}
          key={id}
          name={product.name}
          image={product.image}
          price={product.price}
          quantity={quantity}
        />
      ))}
    </div>
  );
};
