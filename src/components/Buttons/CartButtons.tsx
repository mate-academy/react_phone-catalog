import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { setCart, removeFromCart } from '../../store/cart';
import { getItems } from '../../store';

type Props = {
  product: Product;

};

const CartButton: React.FC<Props> = ({ product }) => {
  const dispatch = useDispatch();
  const itemsCart = useSelector(getItems);

  const isInCart = useMemo(() => (
    itemsCart.some(itemCart => itemCart.product.id === product.id)
  ), [itemsCart, product]);

  const addToCart = (productCart: Product) => {
    if (!isInCart) {
      dispatch(setCart(productCart));
    } else {
      dispatch(removeFromCart(productCart));
    }
  };

  return (
    <>
      <button
        type="button"
        className={classNames('Button__cart',
          {
            Button__InCart: isInCart,
          })}
        onClick={() => addToCart(product)}
      >
        {!isInCart ? 'Add to cart' : 'Added to cart'}
      </button>

    </>
  );
};

export default CartButton;
