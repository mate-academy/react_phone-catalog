import { useCart } from '../../../shared/components/Contexts/CartContext';
import styles from './CartItemsList.module.scss';
import { CartItem } from '../CartItem';

type Props = {
  className?: string;
};

export const CartItemsList: React.FC<Props> = ({ className }) => {
  const { cart } = useCart();

  return (
    <section className={className}>
      <ul className={styles.List}>
        {cart.map(product => (
          <CartItem key={product.id} productInCart={product} />
        ))}
      </ul>
    </section>
  );
};
