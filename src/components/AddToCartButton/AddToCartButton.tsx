import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { Product } from '../../type/Product';

interface Props {
  product: Product;
}

export const AddToCartButton: React.FC<Props> = ({ product }) => {
  const { toggleCartItem, cartItems } = useContext(CartContext);
  const isInCart = cartItems.some((item) => item.id === +product.id);

  const handleAddToCart = () => {
    toggleCartItem({
      id: +product.id,
      quantity: 1,
      product,
      price: product.price,
    });
  };

  return (
    <button
      type="button"
      className={`button__cart ${isInCart ? 'is-added' : ''}`}
      onClick={handleAddToCart}
    >
      {isInCart ? 'Added to Cart' : 'Add to Cart'}
    </button>
  );
};
