import { CartItem } from '../CartItem';
import './CartList.scss';
import { CartItem as CartItemType } from './../../../../types/CartItem';

type Props = {
  cart: CartItemType[];
  removeFromCart: (id: number) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
};

export const CartList: React.FC<Props> = ({
  cart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
}) => {
  return (
    <div className="cart__list">
      <CartItem
        cart={cart}
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
      />
    </div>
  );
};
