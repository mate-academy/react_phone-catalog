import { useCart } from '../../../context/cart/useCart';
import s from './AddToCartButton.module.scss';
import { useState, useEffect } from 'react';

type Props = {
  productId: string;
};

export const AddToCartButton: React.FC<Props> = ({ productId }) => {
  const { cartItems, addToCart, removeFromCart } = useCart();
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    setAddedToCart(cartItems.some(f => f.product.itemId === productId));
  }, [cartItems, productId]);

  const handleClick = () => {
    if (addedToCart) {
      removeFromCart(productId);
    } else {
      addToCart(productId);
    }

    setAddedToCart(!addedToCart);
  };

  return (
    <button
      className={`${s.addToCartButton}${addedToCart ? ` ${s.addedToCart}` : ''}`}
      onClick={handleClick}
    >
      {addedToCart ? 'Added to cart' : 'Add to cart'}
    </button>
  );
};
