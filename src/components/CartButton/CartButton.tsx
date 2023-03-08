import React, { useContext } from 'react';
import cn from 'classnames';
import './CartButton.scss';

import { Product } from '../../types/Product';
import { ProductsContext } from '../../helpers/ProductsContext';

type Props = {
  product: Product;
  isBigButton?: boolean;
};

export const CartButton: React.FC<Props> = ({ product, isBigButton }) => {
  const { addProductToCart, isInCart } = useContext(ProductsContext);
  const isProductInCart = isInCart(product);

  const handleClick = () => addProductToCart(product);

  return (
    <button
      className={cn('cart-button', {
        'cart-button--active': isProductInCart,
        'cart-button--big': isBigButton,
      })}
      type="button"
      onClick={handleClick}
    >
      {isProductInCart
        ? 'Added to cart'
        : 'Add to cart'}
    </button>
  );
};

CartButton.defaultProps = {
  isBigButton: false,
};
