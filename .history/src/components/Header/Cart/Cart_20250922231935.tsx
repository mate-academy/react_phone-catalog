import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { StoreContext } from '../../../StoreProvider';

export const Cart: React.FC = () => {
  const { cartItems } = useContext(StoreContext);
  return <NavLink to="/cart">Cart ({cartItems.length})</NavLink>;
};
