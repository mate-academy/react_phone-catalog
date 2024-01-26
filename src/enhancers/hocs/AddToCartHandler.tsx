import React, { memo, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { cartActions } from '../../store/slices/cartSlice';

export interface AddToCartHandlerRenderProps {
  onClick?: () => void,
  children: React.ReactNode;
  selected?: boolean;
}

interface Props {
  productId: string | null,
  render: (props: AddToCartHandlerRenderProps) => React.ReactElement,
}

export const AddToCartHandler: React.FC<Props> = memo(({
  productId,
  render,
}) => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector(state => state.cart.ids);

  if (productId === null) {
    return render({ children: 'Add to cart' })
  }

  const isInCart = Object.hasOwn(cart, productId);

  const toggleProductInCart = useCallback(() => {
    dispatch(
      isInCart
        ? cartActions.remove(productId)
        : cartActions.add(productId),
    );
  }, [productId, isInCart]);

  return render({
    onClick: toggleProductInCart,
    selected: isInCart,
    children: isInCart ? 'Added to cart' : 'Add to cart',
  });
});
