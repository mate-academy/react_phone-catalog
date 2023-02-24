import classNames from 'classnames';
import { FC, useState } from 'react';
import { Product } from '../types/Product';

type Props = {
  product: Product;
};

export const LikeButton: FC<Props> = ({ product }) => {
  const [isAddLike, setIsAddLike] = useState(false);

  const toggleLike = () => {
    if (localStorage.getItem('favorites')) {
      const likes = JSON.parse(localStorage.getItem('favorites') || '');

      const foundLike = likes.includes(product.id);

      if (!foundLike) {
        localStorage.setItem('favorites', JSON.stringify([
          ...likes, product.id,
        ]));
        setIsAddLike(!isAddLike);
      }

      if (foundLike) {
        localStorage.setItem('favorites', JSON.stringify([
          ...likes.filter((item: string) => item !== product.id),
        ]));
        setIsAddLike(!isAddLike);
      }
    }
  };

  return (
    <button
      className={classNames(
        'products-slider__item-button products-slider__item-button-favorite', {
          'products-slider__item-button-favorite--active':
          localStorage.getItem('favorites')?.includes(product.id),
        },
      )}
      type="button"
      data-cy="addToFavorite"
      onClick={toggleLike}
    >
      <img src="./img/icons/Like.svg" alt="add" />
      <img src="./img/icons/Red Like.svg" alt="remove" />
    </button>
  );
};
