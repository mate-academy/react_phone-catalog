import { FC } from 'react';
import classNames from 'classnames';
import { Product } from '../../types/Product';
import { useAppContext } from '../../context/AppContext';

type Props = {
  product: Product;
  isSelected: boolean;
};

export const ButtonAddToCart: FC<Props> = ({
  product,
  isSelected,
}) => {
  const { handleToggleAddToCart } = useAppContext();

  return (
    <button
      type="button"
      className={classNames(
        'button',
        { 'button--selected': isSelected },
      )}
      onClick={() => handleToggleAddToCart(product)}
    >
      {isSelected ? 'Added to cart' : 'Add to cart'}
    </button>
  );
};
