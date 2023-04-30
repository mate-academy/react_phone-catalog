import { FC } from 'react';
import classNames from 'classnames';
import { useAppContext } from '../../context/AppContext';
import { Product } from '../../types/Product';

type Props = {
  product: Product;
  isSelected: boolean;
};

export const ButtonAddToCart: FC<Props> = ({ product, isSelected }) => {
  const { handleToggleAddToCart } = useAppContext();

  return (
    <button
      type="button"
      className={classNames('button', 'product-item__button', {
        'button--selected': isSelected,
      })}
      onClick={() => handleToggleAddToCart(product)}
    >
      {`${isSelected ? 'Added to cart' : 'Add to cart'}`}
    </button>
  );
};
