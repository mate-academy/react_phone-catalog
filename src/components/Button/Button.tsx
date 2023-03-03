import React, { useContext } from 'react';
import classNames from 'classnames';
import './Button.scss';

import { Product } from '../../types/Product';
import { ProductsContext } from '../../helpers/ProductsContext';

type Props = {
  product: Product;
  isBigButton?: boolean;
};

export const Button: React.FC<Props> = ({ product, isBigButton }) => {
  const { addProductToCart, isInCart } = useContext(ProductsContext);

  return (
    <>
      <button
        className={
          classNames(
            'button',
            {
              // eslint-disable-next-line max-len
              'button--active': isInCart(product),
              'button--big': isBigButton,
            },
          )
        }
        type="button"
        onClick={() => addProductToCart(product)}
      >
        {isInCart(product)
          ? 'Added to cart'
          : 'Add to cart'}
      </button>
    </>
  );
};

Button.defaultProps = {
  isBigButton: false,
};
