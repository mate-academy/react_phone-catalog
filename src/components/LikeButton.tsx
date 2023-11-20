import classNames from 'classnames';
import { FC, useContext } from 'react';
import { Context } from '../contexts/Context';
import { Product } from '../types/Product';

type Props = {
  id: string,
  product: Product;
};

export const LikeButton: FC<Props> = ({ product, id }) => {
  const {
    fav,
    toggleFav,
  } = useContext(Context);

  const foundProduct = fav.find((favList: Product) => (
    favList.id === id));

  return (
    <button
      className={classNames(
        'products-slider__item-button products-slider__item-button-favorite', {
          'products-slider__item-button-favorite--active': foundProduct,
        },
      )}
      type="button"
      data-cy="addToFavorite"
      onClick={() => toggleFav(product)}
    >
      <img src="./img/icons/Like.svg" alt="add" />
      <img src="./img/icons/Red Like.svg" alt="remove" />
    </button>
  );
};
