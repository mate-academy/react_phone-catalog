import React, { memo, useCallback } from 'react';
import { Product } from '../../definitions/types/Product';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { cartActions } from '../../store/slices/cartSlice';

export interface AddToCartHandlerRenderProps {
  onClick: () => void,
  children: React.ReactNode;
  selected: boolean;
}

interface Props {
  product: Product,
  render: (props: AddToCartHandlerRenderProps) => React.ReactElement,
}

export const AddToCartHandler: React.FC<Props> = memo(({
  product,
  render,
}) => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector(state => state.cart);
  const isInCart = Object.hasOwn(cart, product.id);

  const toggleProductInCart = useCallback(() => {
    dispatch(
      isInCart
        ? cartActions.remove(product)
        : cartActions.add(product),
    );
  }, [product, isInCart]);

  return render({
    onClick: toggleProductInCart,
    selected: isInCart,
    children: isInCart ? 'Added to cart' : 'Add to cart',
  });
});
