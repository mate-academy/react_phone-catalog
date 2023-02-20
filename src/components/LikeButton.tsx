import classNames from 'classnames';
import { FC } from 'react';
import { Product } from '../types/Product';

type Props = {
  product: Product;
};

export const LikeButton: FC<Props> = ({ product }) => {
  return (
    <button
      className={classNames(
        'products-slider__item-button products-slider__item-button-favorite', {
          'products-slider__item-button-favorite--active':
         localStorage.getItem('favorites')?.includes(product.id),
        },
      )}
      type="button"
    >
      <img src="./img/icons/Like.svg" alt="add" />
      <img src="./img/icons/Red Like.svg" alt="remove" />
    </button>
  );
};
