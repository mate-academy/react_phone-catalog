import classNames from 'classnames';
import { FC, useState, useEffect } from 'react';
import { Product } from '../types/Product';

type Props = {
  id: string,
  product: Product;
};

export const LikeButton: FC<Props> = ({ id, product }) => {
  const [isAddLike, setIsAddLike] = useState(false);

  useEffect(() => {
    const likeStorage = localStorage.getItem('favourite')
      ? JSON.parse(localStorage.getItem('favourite') || '')
      : [];

    if (likeStorage.find((item: Product) => item.id === id)) {
      setIsAddLike(true);
    } else {
      setIsAddLike(false);
    }
  }, []);

  const toggleLike = () => {
    if (isAddLike) {
      let likeStorage = localStorage.getItem('favourite')
        ? JSON.parse(localStorage.getItem('favourite') || '')
        : [];

      likeStorage = likeStorage.filter((item: Product) => item.id !== id);
      window.localStorage.setItem('favourite', JSON.stringify(likeStorage));

      setIsAddLike(!isAddLike);
    } else {
      const likeStorage = localStorage.getItem('favourite')
        ? JSON.parse(localStorage.getItem('favourite') || '')
        : [];

      likeStorage.push(product);
      window.localStorage.setItem('favourite', JSON.stringify(likeStorage));

      setIsAddLike(!isAddLike);
    }
  };

  return (
    <button
      className={classNames(
        'products-slider__item-button products-slider__item-button-favorite', {
          'products-slider__item-button-favorite--active': isAddLike,
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
