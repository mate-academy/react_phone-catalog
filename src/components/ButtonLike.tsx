import classNames from 'classnames';
import { FC } from 'react';
import { useAppContext } from '../context/AppContext';
import { Product } from '../types/Product';

type Props = {
  product: Product;
  isSelected: boolean;
};

export const ButtonLike: FC<Props> = ({ product, isSelected }) => {
  const { handleToggleLike } = useAppContext();

  return (
    <button
      aria-label="like"
      type="button"
      className={classNames('button-like', {
        'button-like--selected': isSelected,
      })}
      onClick={() => handleToggleLike(product)}
    />
  );
};
