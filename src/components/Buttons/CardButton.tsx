import React from 'react';
import { useDispatch } from 'react-redux';
import cn from 'classnames';
import { setToCard } from '../../store/products';

type Props = {
  id: string;
  inCard?: boolean;
  className?: string;
};


export const CardButton: React.FC<Props> = ({ id, inCard, className }) => {
  const dispatch = useDispatch();
  const handleClick = (productId: string) => {
    dispatch(setToCard(productId));
  };

  return (
    <button
      onClick={() => handleClick(id)}
      type="button"
      className={cn(`${className}`, { PhoneCard__button_added: inCard })}
    >
      {inCard ? 'Added to cart' : 'Add to cart'}
    </button>
  );
};
