import { FC } from 'react';
import classNames from 'classnames';
import { Product } from '../../../types/Product';
import { useAppContext } from '../../../context/AppContext';

type Props = {
  product: Product;
  isSelected: boolean;
};

export const ButtonAddToCart: FC<Props> = ({ product, isSelected }) => {
  const { handleToggleAddToCart } = useAppContext();

  const handleAddCart = () => handleToggleAddToCart(product);

  return (
    <button
      type="button"
      className={classNames('button__add', {
        'button__add--selected': isSelected,
      })}
      onClick={handleAddCart}
    >
      {isSelected ? 'Added to cart' : 'Add to cart'}
    </button>
  );
};
