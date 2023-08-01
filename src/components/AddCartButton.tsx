import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import classNames from 'classnames';
import { addCart, deleteCart } from '../Reducers/cartReducer';

import { Products } from '../type/Products';
import { RootState } from '../Reducers/store';

type Props = {
  phone: Products;
};

export const AddCartButton: React.FC<Props> = ({ phone }) => {
  const [isAdded, setIsAdded] = useState<boolean>();

  const cart = useSelector((state: RootState) => state.cart);

  useEffect(() => {
    setIsAdded(
      cart.some((product: Products) => product.itemId === phone.itemId),
    );
  }, [cart]);

  const dispatch = useDispatch();

  const handler = (product: Products) => {
    if (isAdded) {
      dispatch(deleteCart(product.itemId));
    } else {
      dispatch(addCart(product));
    }
  };

  return (
    <button
      className={classNames(
        'button',
        'button__add',
        { 'button__add--selected': isAdded },
      )}
      type="button"
      onClick={() => handler(phone)}
    >
      {isAdded ? ('addedToCart') : ('addToCart')}
    </button>
  );
};
