import './CartCheckout.scss';
import { CartItem as CartItemType } from './../../../../types/CartItem';

type Props = {
  cart: CartItemType[];
};

export const CartCheckout: React.FC<Props> = ({ cart }) => {
  const totalPrice = cart.reduce((sum, item) => {
    return sum + item.product.price * item.quantity;
  }, 0);

  const totalQuantity = cart.reduce((sum, item) => {
    return sum + item.quantity;
  }, 0);

  return (
    <div className="cart__checkout">
      <div className="cart__checkout-total">${totalPrice}</div>
      <div className="cart__checkout-quantity">
        Total for {totalQuantity} items
      </div>
      <div className="cart__checkout-btn">Checkout</div>
    </div>
  );
};
