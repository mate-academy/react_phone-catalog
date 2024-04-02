import { FC } from 'react';
import cn from 'classnames';
import { useAppContext } from '../../../context/AppContext';
import { Product } from '../../../types/Product';

type Props = {
  product: Product;
  isSelected: boolean;
};

export const ButtonLike: FC<Props> = ({ product, isSelected }) => {
  const { handleToggleLike } = useAppContext();

  const handleLike = () => handleToggleLike(product);

  return (
    <button
      aria-label="like"
      type="button"
      className={cn('button__like', {
        'button__like--selected': isSelected,
      })}
      onClick={handleLike}
    >
      {isSelected ? (
        <img
          src="./img/svg/RedHeart.svg"
          alt="redHeart"
          className="button__like--img"
        />
      ) : (
        <img
          src="./img/svg/Heart.svg"
          alt="heartTrasparent"
          className="button__like--img"
        />
      )}
    </button>
  );
};
