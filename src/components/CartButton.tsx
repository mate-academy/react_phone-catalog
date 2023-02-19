import classNames from 'classnames';
import { FC } from 'react';
import { Product } from '../types/Product';

type Props = {
  product: Product,
};

export const CartButton: FC<Props> = ({ product }) => {
  return (
    <button
      className={classNames(
        'products-slider__item-button products-slider__item-button-cart', {
          'products-slider__item-button-cart--active':
        localStorage.getItem('carts')?.includes(product.id),
        },
      )}
      type="button"
    >
      Add to cart
    </button>
  );
};
