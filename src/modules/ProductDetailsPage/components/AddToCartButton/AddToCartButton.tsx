import { useCart } from '../../../shared/context/CartContext';
import type { Product } from '../../../shared/types/Product';
import styles from './AddToCartButton.module.scss';

interface AddToCartButtonProps {
  product: Product;
}

export function AddToCartButton({
  product,
}: AddToCartButtonProps): JSX.Element {
  const { isInCart, addToCart } = useCart();
  const inCart = isInCart(product.id);

  const handleClick = (): void => {
    if (!inCart) {
      addToCart(product);
    }
  };

  return (
    <button
      className={styles.button}
      onClick={handleClick}
      disabled={inCart}
      aria-label={inCart ? 'Added to cart' : `Add ${product.name} to cart`}
    >
      {inCart ? 'Added to cart' : 'Add to cart'}
    </button>
  );
}
