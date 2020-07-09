import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getCart } from '../../store/index';
import { setToCart, removeFromCart } from '../../store/cart';

type Props = {
  product: ProductItem;
};

const AddToCartButton: React.FC<Props> = ({ product }) => {
  const dispatch = useDispatch();
  const itemsCart = useSelector(getCart);

  const isAdded = useMemo(() => (
    itemsCart.some(itemCart => itemCart.product.id === product.id)
  ), [itemsCart, product]);

  const addToCart = (productCart: ProductItem) => {
    if (!isAdded) {
      dispatch(setToCart(productCart));
    } else {
      dispatch(removeFromCart(productCart));
    }
  };

  return (
    <button
      className={isAdded
        ? 'button__cart button__cart--added'
        : 'button__cart'}
      type="button"
      onClick={() => addToCart(product)}
    >
      {isAdded ? 'Remove from cart' : 'Add to cart'}
    </button>
  );
};

export default AddToCartButton;
