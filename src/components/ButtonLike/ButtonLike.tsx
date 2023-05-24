import { FC } from 'react';
import { useAppContext } from '../../context/AppContext';
import { Product } from '../../types/Product';
import redHeart from '../../assets/svg/redHeart.svg';
import heartTrasparent from '../../assets/svg/heartTransparent.svg';

import './buttonLike.scss';

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
      className="button-like"
      onClick={handleLike}
    >
      {isSelected
        ? (
          <img src={redHeart} alt="redHeart" className="button-like__img" />
        )
        : (
          <img
            src={heartTrasparent}
            alt="heartTrasparent"
            className="button-like__img"
          />
        )}
    </button>
  );
};
