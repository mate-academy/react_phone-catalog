import { useContext } from 'react';
import { CartContext } from '../../../contexts/CartContextProvider';
import { CartItem } from '../CartItem/CartItem';

import './CartItemList.scss';

export const CartItemList = () => {
  const { cart } = useContext(CartContext);

  return (
    <ul className="cart-items-list">
      {cart.map(currentItem => {
        const {
          name,
          image,
          price,
          phoneId,
          category,
        } = currentItem.product;

        return (
          <CartItem
            name={name}
            image={image}
            price={price}
            phoneId={phoneId}
            category={category}
            key={currentItem.id}
            cartItem={currentItem}
          />
        );
      })}
    </ul>
  );
};
