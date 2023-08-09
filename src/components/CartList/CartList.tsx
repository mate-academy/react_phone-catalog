import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { CartCard } from '../CartCard';

export const CartList = () => {
  const { cartItems } = useContext(CartContext);

  return (
    <div className="cart-list grid__item--desktop-1-16">
      {cartItems.map(item => (
        <CartCard cartItem={item} key={item.id} />
      ))}
    </div>
  );
};
