import './CartItemList.scss';
import { useContext } from 'react';
import { CartContext } from '../contexts/CartContextProvider';
import { CartItem } from '../CartItem/CartItem';

export const CartItemList = () => {
  const { cart } = useContext(CartContext);

  return (
    <ul className="cart-list">
      {cart.map(cartItem => {
        const {
          phoneId, category, image, name, price,
        } = cartItem.product;

        return (
          <CartItem
            key={cartItem.id}
            phoneId={phoneId}
            category={category}
            image={image}
            name={name}
            price={price}
            cartItem={cartItem}
          />
        );
      })}
    </ul>
  );
};
