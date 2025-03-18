import { useContext } from 'react';
import { LocalStorageContext } from '../../../app/Contexts/LocalStorageContext';

import { Product } from '../../../types/Product';

import { CartItem } from './CartItem/CartItem';

export const Cart = () => {
  const { cartItems } = useContext(LocalStorageContext);

  return (
    <div className="Cart">
      <h1>Cart</h1>
      <div className="cart__items">
        {cartItems.length > 0 ? (
          cartItems.map((item: Product) => {
            return <CartItem key={item.id} item={item} />;
          })
        ) : (
          <p>No items in your cart yet</p>
        )}
      </div>
    </div>
  );
};
