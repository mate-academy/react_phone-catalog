import { useContext } from 'react';
import classNames from 'classnames';
import { Product } from '../../types/Product';
import { Context } from '../../context/Context';
import './LikeButton.scss';
import { ButtonType } from '../../types/ButtonType';

type Props = {
  product: Product;
  size: ButtonType;
};

export const LikeButton: React.FC<Props> = ({ product, size }) => {
  const { changeFavorite, favorite } = useContext(Context);

  const isInFavs = favorite.length > 0
    ? favorite.find(item => item.id === product?.id) : false;

  return (
    <button
      aria-label="like"
      type="button"
      className={classNames(
        'button-like',
        'button-like--icon',
        `button-like--${size}`,
        {
          'button-like--icon--selected': isInFavs,
        },
      )}
      onClick={() => changeFavorite(product)}
    >
      {}
    </button>
  );
};
