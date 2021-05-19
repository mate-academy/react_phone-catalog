import React from 'react';
import classnames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { actions as cartActions } from '../../../store/cart';
import { getCartGoods, getGoods } from '../../../store/store';
import { ProductDetails } from '../../../helpers/types';

export const ProductDetailsButton: React.FC<ProductDetails> = ({ product }) => {
  const dispatch = useDispatch();
  const cartGoods = useSelector(getCartGoods);
  const goods = useSelector(getGoods);
  const addedToCart: boolean = cartGoods.some(good => good.id === product.id);

  const addGoodToCart = () => {
    const goodToAdd = goods.find(good => good.id === product.id);

    if (goodToAdd) {
      dispatch(cartActions.add(goodToAdd));
    }
  };

  const removeGoodFromCart = () => {
    const goodToRemove = goods.find(good => good.id === product.id);

    if (goodToRemove) {
      dispatch(cartActions.remove(goodToRemove));
    }
  };

  return (
    <button
      type="button"
      className={classnames(
        'Actions-CartButton',
        { 'Actions-CartButton_active': addedToCart },
      )}
      onClick={addedToCart
        ? removeGoodFromCart
        : addGoodToCart}
    >
      {addedToCart ? 'Added to cart' : 'Add to cart'}
    </button>
  );
};
