import { CartProduct } from '../../types/CartProduct';
import { CartItem } from '../CartItem';
import './style.scss';

type CartListProps = {
  cartProducts: CartProduct[]
};

export const CartList: React.FC<CartListProps> = ({
  cartProducts,
}) => {
  return (
    <ul className="cart-list">
      {cartProducts.map(cartItem => (
        <li className="cart-list__item" key={cartItem.id}>
          <CartItem cartItem={cartItem} />
        </li>
      ))}
    </ul>
  );
};
