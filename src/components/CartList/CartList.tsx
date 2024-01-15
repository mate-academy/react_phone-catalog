import './CartList.scss';
import { useContext } from 'react';
import { CartItem } from '../CartItem/CartItem';
import { CartContext } from '../../contexts/CartContext';

export const CartList = () => {
  const { unique } = useContext(CartContext);

  return (
    <ul className="cart-list">
      {unique.map(product => (<CartItem key={product.id} product={product} />))}
    </ul>
  );
};
