/* eslint-disable @typescript-eslint/indent */
import { useEffect, useMemo, useReducer } from 'react';
import { cartReducer } from 'src/reducers/cartReducer';
import { Product } from 'src/types/Types';
import { CartProduct } from 'src/types/Types';

export const useCart = (products: Product[]) => {
  const initialState: CartProduct[] = useMemo(() => {
    const savedCart = localStorage.getItem('cartProducts');

    return savedCart ? JSON.parse(savedCart) : [];
  }, []);

  const [cartProducts, cartDispatch] = useReducer(cartReducer, initialState);

  const addToCart = (name: string) => {
    const findProduct = products.find(el => el.name === name);

    if (!findProduct) {
      return;
    }

    cartDispatch({
      type: 'ADD_TO_CART',
      payload: findProduct,
    });
  };

  const toggleCart = (productName: string) => {
    const isProductInCart = cartProducts.some(
      cartItem => cartItem.name === productName,
    );

    const action = isProductInCart
      ? () => {
          cartDispatch({ type: 'REMOVE_FROM_CART', payload: productName });
        }
      : () => {
          addToCart(productName);
        };

    return { isProductInCart, action };
  };

  useEffect(() => {
    localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
  }, [cartProducts]);

  return { cartProducts, cartDispatch, addToCart, toggleCart };
};
