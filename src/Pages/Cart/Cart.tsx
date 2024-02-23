import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useMemo } from 'react';
import { CartView } from './CartView';
import { selectCart } from '../../store/selectors/cartSlice';
import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
} from '../../store/reducers/cartSlice';

export const Cart = () => {
  const { cart } = useSelector(selectCart);
  const dispatch = useDispatch();

  const incrementProduct = useCallback((id: string) => {
    dispatch(incrementQuantity(id));
  }, [dispatch]);

  const decrementProduct = useCallback((id: string) => {
    dispatch(decrementQuantity(id));
  }, [dispatch]);

  const removeProduct = useCallback((id: string) => {
    dispatch(removeFromCart(id));
  }, [dispatch]);

  const totalCost = useMemo(() => {
    return cart?.reduce(
      (acc, item) => acc + item.quantity * item.product.price, 0,
    ) || 0;
  }, [cart]);

  const totalItems = useMemo(() => {
    return cart?.length || 0;
  }, [cart]);

  return (
    <CartView
      cartItems={cart || []}
      incrementProduct={incrementProduct}
      decrementQuantity={decrementProduct}
      removeProduct={removeProduct}
      totalCost={totalCost}
      totalItems={totalItems}
    />
  );
};
