import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import classNames from 'classnames';
import { addCart, deleteCart } from '../Reducer/cartReducer';

import { Products } from '../type/Products';

type Props = {
  phone: Products;
};

export const AddCartButton: React.FC<Props> = ({ phone }) => {
  const [isAdded, setIsAdded] = useState(false);

  const cart = useSelector((state: any) => state.cart);

  useEffect(() => {
    setIsAdded(
      cart.find((product: Products) => product.itemId === phone.itemId),
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
      {isAdded ? 'Added to cart' : 'Add to Cart'}
    </button>
  );
};
