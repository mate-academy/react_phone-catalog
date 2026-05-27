import { selectIsInCart } from '@/store/slices/cartSlice';
import { useSelector } from 'react-redux';

export const useCartActions = (itemId: string) => {
  const isInCart = useSelector(selectIsInCart(itemId));

  return {
    isInCart,
    buttonText: isInCart ? 'Added to Cart' : 'Add to Cart',
  };
};
