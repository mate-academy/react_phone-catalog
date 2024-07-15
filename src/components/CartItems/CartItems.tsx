import { useProductsCart } from '../../store/CartProvider';
import { CartItem } from '../CartItem/CartItem';
import styles from './CartItems.module.scss';

export const CartItems = () => {
  const { cart } = useProductsCart();

  return (
    <div className={styles.Wrapper}>
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
