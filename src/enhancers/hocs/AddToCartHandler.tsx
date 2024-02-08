import React, { memo, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/redux/hooks';
import { cartActions } from '../../store/redux/slices/cartSlice';

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
  const cart = useAppSelector(state => state.cart.storageProducts);

  if (productId === null) {
    return render({ children: 'Add to cart' })
  }
  
  const isInCart = cart.some(cartProduct => cartProduct.id === productId);
  
  const toggleProductInCart = useCallback(() => {
    console.log(isInCart);
    dispatch(
      isInCart
        ? cartActions.removeProduct(productId)
        : cartActions.addProduct(productId),
    );
  }, [productId, isInCart]);

  return render({
    onClick: toggleProductInCart,
    selected: isInCart,
    children: isInCart ? 'Added to cart' : 'Add to cart',
  });
});
