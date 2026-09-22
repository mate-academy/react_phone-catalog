import { addToCart } from '@/redux/cartSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

export const useCartButton = (productId: string) => {
  const dispatch = useAppDispatch();
  const selectedItems = useAppSelector(state => state.cart.items);
  const isSelected = Boolean(selectedItems.find(item => item.id === productId));

  const onSelectClick = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    if (!isSelected) {
      dispatch(addToCart(productId));
    }
  };

  return { isSelected, onSelectClick };
};
