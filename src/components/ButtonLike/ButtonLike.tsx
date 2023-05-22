import { FC } from 'react';
import { useAppContext } from '../../context/AppContext';
import { Product } from '../../types/Product';
import heartTransparent from '../../assets/svg/heartTransparent.svg';
import heartRed from '../../assets/svg/heartRed.svg';

import './button-like.scss';

type Props = {
  product: Product;
  isSelected: boolean;
};

export const ButtonLike: FC<Props> = ({ product, isSelected }) => {
  const { handleToggleLike } = useAppContext();
  const like = () => handleToggleLike(product);

  return (
    <button
      aria-label="like"
      type="button"
      className="button-like"
      onClick={like}
    >
      {isSelected ? (
        <img src={heartRed} alt="heartRed" />
      ) : (
        <img src={heartTransparent} alt="heartTransparent" />
      )}
    </button>
  );
};
