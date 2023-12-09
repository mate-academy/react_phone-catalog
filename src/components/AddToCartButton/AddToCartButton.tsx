import React, { useContext, memo } from 'react';
import classNames from 'classnames';
import { Product } from '../../types/Product';
import { CartContext } from '../../storage/CartContext';
import './AddToCartButton.scss';

type Props = {
  product: Product;
};

export const AddToCartButton: React.FC<Props> = memo(({ product }) => {
  const { isInCart, handleCart } = useContext(CartContext);
  const selected = isInCart(product.name);

  return (
    <button
      className={classNames(
        'add-to-cart-button',
        { 'add-to-cart-button--selected': selected },
      )}
      type="button"
      onClick={() => handleCart(product)}
    >
      {selected ? 'Added to cart' : 'Add to cart'}
    </button>
  );
});
