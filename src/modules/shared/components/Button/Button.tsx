import { useCart } from '../../hooks/useCart';
import { Product } from '../../types/Product';
import styles from './Button.module.scss';

type Props = {
  product: Product;
};

export default function Button({ product }: Props) {
  const cart = useCart();

  const isInCart = cart.items.find(item => item.id === product.id);

  return (
    <>
      {isInCart ? (
        <button
          onClick={() => cart.remove(product.id)}
          className={styles.buttonAdded}
        >
          Added to cart
        </button>
      ) : (
        <button onClick={() => cart.add(product)} className={styles.buttonAdd}>
          Add to cart
        </button>
      )}
    </>
  );
}
