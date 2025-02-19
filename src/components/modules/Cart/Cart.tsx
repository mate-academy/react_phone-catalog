import { useLocalStorage } from '../../../utils/globalStyles/customHooks';

import { ShopItem } from '../../../types/ShopItem';

import { CartItem } from './CartItem/CartItem';

export const Cart = () => {
  const { cartItems } = useLocalStorage<ShopItem>();

  return (
    <div className="Cart">
      <h1>Cart</h1>
      <div className="cart__items">
        {cartItems.length > 0 ? (
          cartItems.map((item: ShopItem) => {
            return <CartItem key={item.id} item={item} />;
          })
        ) : (
          <p>No items in your cart yet</p>
        )}
      </div>
    </div>
  );
};
