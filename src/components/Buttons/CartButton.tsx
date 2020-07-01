import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import { setToCart, getCartItems } from '../../store/cart';

type Props = {
  product: Products;
  className?: string;
};


export const CartButton: React.FC<Props> = ({ product, className }) => {
  const dispatch = useDispatch();
  const productsInCart = useSelector(getCartItems);

  const handleClick = (currentProduct: Products) => {
    dispatch(setToCart(currentProduct));
  };

  const inCart = productsInCart.some((item: CartProduct) => item.product.id === product.id);

  return (
    <button
      onClick={() => handleClick(product)}
      type="button"
      className={cn(`${className}`, { PhoneCard__button_added: inCart })}
    >
      {inCart ? 'Added to cart' : 'Add to cart'}
    </button>
  );
};
