import { useCart } from '../../contexts/CartContext/CartContext';
import { Product } from '../../types/Product';
import './CartButton.module.scss';

interface CartButton {
  product: Product;
}

export const CartButton: React.FC<CartButton> = ({ product }) => {
  const { cart, addToCart, removeFromCart } = useCart();

  const isInCart = cart.some(item => item.id === product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();

    if (!isInCart) {
      addToCart(product);
    }
  };

  const handleremoveFromCart = (e: React.MouseEvent) => {
    e.preventDefault();

    if (isInCart) {
      removeFromCart(product.id);
    }
  };

  return (
    <button
      className={`product_add-to-cart add-to-cart ${isInCart ? 'add-to-cart--disabled' : ''}`}
      onClick={isInCart ? handleremoveFromCart : handleAddToCart}
    >
      {isInCart ? 'Added' : 'Add to cart'}
    </button>
  );
};
