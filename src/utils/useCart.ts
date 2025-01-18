import { useContext, useEffect, useState } from 'react';
import { DispatchContext, StateContext } from '../store/GlobalProvider';
import { Product } from '../types/Product';

export const useCart = (prod: Product) => {
  const { cart } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  const [inCart, setInCart] = useState(false);

  useEffect(() => {
    const savedCart = JSON.parse(
      localStorage.getItem('cart') || '[]',
    ) as Product[];
    const isCart = savedCart.some(car => car.itemId === prod.itemId);

    setInCart(isCart);
  }, [prod.itemId]);

  const isFavourite = cart.some(car => car.itemId === prod.itemId);

  const toggleCart = () => {
    if (isFavourite) {
      dispatch({ type: 'removeFromCart', payload: prod.itemId });
      setInCart(false);
    } else {
      dispatch({ type: 'addToCart', payload: prod });
      setInCart(true);
    }

    const updatedCart = isFavourite
      ? cart.filter(car => car.itemId !== prod.itemId)
      : [...cart, prod];

    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  return { inCart, toggleCart };
};
