import cn from 'classnames';
import { Product } from '../../../../types/Product';
import { useCart } from '../../context/CartContext';
import styles from './AddToCartButton.module.scss';

interface Props {
  product: Product;
  className?: string;
}

export const AddToCartButton = ({ product, className }: Props) => {
  const { isInCart, addToCart } = useCart();
  const isAdded = isInCart(product.id);

  return (
    <button
      type="button"
      className={cn(styles.button, { [styles.added]: isAdded }, className)}
      disabled={isAdded}
      onClick={() => addToCart(product)}
    >
      {isAdded ? 'Added to cart' : 'Add to cart'}
    </button>
  );
};
