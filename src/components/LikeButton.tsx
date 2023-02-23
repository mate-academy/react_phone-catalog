import classNames from 'classnames';
import { FC, useState, useEffect } from 'react';
import { Product } from '../types/Product';

type Props = {
  product: Product;
};

export const LikeButton: FC<Props> = ({ product }) => {
  const [isAddLike, setIsAddLike] = useState(false);
  const foundFav
  = JSON.parse(localStorage.getItem('favorites') || '').map(
    (el: string) => el,
  );

  const [items, setItems] = useState(foundFav);

  useEffect(() => {
    setItems(foundFav);
  }, [foundFav]);

  const toggleLike = () => {
    if (localStorage.getItem('favorites')) {
      const likes = JSON.parse(localStorage.getItem('favorites') || '');

      const foundLike = likes.includes(product.id);

      if (!foundLike) {
        localStorage.setItem('favorites', JSON.stringify([
          ...likes, product.id,
        ]));
        setItems(items);
        setIsAddLike(!isAddLike);
      }

      if (foundLike) {
        localStorage.setItem('favorites', JSON.stringify([
          ...likes.filter((item: string) => item !== product.id),
        ]));
        setItems(items);
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
      onClick={toggleLike}
    >
      <img src="./img/icons/Like.svg" alt="add" />
      <img src="./img/icons/Red Like.svg" alt="remove" />
    </button>
  );
};
