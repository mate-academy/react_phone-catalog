import React, { memo } from 'react';
import { TextButton } from '../TextButton';
import classNames from 'classnames';
import addToCartButtonStyles from './AddToCartButton.module.scss';
import { useCart } from '../../context/CartContext';

type Props = {
  className?: string;
  itemId: string;
};

export const AddToCartButton: React.FC<Props> = memo(
  ({ className, itemId }) => {
    const { cart, toggleProductInCart } = useCart();
    const isInCart = cart.map(item => item.id).includes(itemId);

    return (
      <TextButton
        className={classNames(
          className,
          addToCartButtonStyles.addToCartButton,
          {
            [addToCartButtonStyles['addToCartButton--selected']]: isInCart,
          },
        )}
        onClick={() => toggleProductInCart(itemId)}
      >
        {isInCart ? 'Added' : 'Add to cart'}
      </TextButton>
    );
  },
);

AddToCartButton.displayName = 'AddToCartButton';
