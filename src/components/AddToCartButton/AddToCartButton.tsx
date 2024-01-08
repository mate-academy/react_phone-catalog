import React from 'react';
import cn from 'classnames';

import { Product } from '../../types/Product';
import './AddToCartButton.scss';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import * as cartActions from '../../features/cartSlicer';

type Props = {
  product: Product;
};

export const AddToCartButton: React.FC<Props> = ({ product }) => {
  const dispatch = useAppDispatch();

  const cartProducts = useAppSelector((state) => state.cartProducts.items);

  const isProductInCart = cartProducts.some(
    (item) => item.id === product.id,
  );

  const isCart = cartProducts.some(
    (cartProduct) => cartProduct.phoneId === product.phoneId,
  );

  const handleAddProduct = (newProduct: Product) => {
    if (isCart) {
      dispatch(cartActions.deleteCartProducts(newProduct.id));
    } else {
      dispatch(cartActions.setCartProducts(newProduct));
    }
  };

  return (
    <button
      type="button"
      className={cn('AddToCartButton', {
        'added-to-cart': isProductInCart,
      })}
      onClick={(event) => {
        event.preventDefault();
        handleAddProduct(product);
      }}
    >
      {isProductInCart ? 'Added to cart' : 'Add to cart'}
    </button>
  );
};
