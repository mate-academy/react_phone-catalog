import React from 'react';
import { BoxButton } from '../BoxButton';
import { useAppDispatch } from '../../store/hooks';
import { cartActions } from '../../store/cart/cartSlice';

type Props = {
  isSelected: boolean;
  itemId: string;
  isBig?: boolean;
};

export const AddToCartButton: React.FC<Props> = ({
  isSelected,
  itemId,
  isBig = false,
}) => {
  const dispatch = useAppDispatch();

  return (
    <BoxButton
      isSelected={isSelected}
      isBig={isBig}
      onClick={() => {
        dispatch(cartActions.toggleItem(itemId));
      }}
    >
      {isSelected ? 'Added' : 'Add to cart'}
    </BoxButton>
  );
};
