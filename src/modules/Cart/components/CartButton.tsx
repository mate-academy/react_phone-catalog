import { Product } from '../../Catalog/interfaces/Product';
import { useCart } from '../CartContext';
import styles from './CartButton.module.scss';

interface CartButtonProps {
  product: Product;
  className?: string;
}

export const CartButton: React.FC<CartButtonProps> = ({
  product,
  className,
}) => {
  const { cartItems, addToCart } = useCart();

  const alreadyInCart = cartItems.some(item => item.id === product.id);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();

    if (!alreadyInCart) {
      addToCart({
        id: product.id,
        name: product.name,
        image: product.image,
        price: product.price.toString(),
        category: product.category,
      });
    }
  };

  return (
    <a
      href="#"
      onClick={handleClick}
      className={[
        styles.cartButton,
        className,
        alreadyInCart ? styles.added : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {alreadyInCart ? 'Added to cart' : 'Add to cart'}
    </a>
  );
};
