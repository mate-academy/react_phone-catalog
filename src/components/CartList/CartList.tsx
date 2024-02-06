import { CartItem } from '../../types/CartItem';
import { CartItem as Item } from '../CartItem';
import './cart-list.scss';

type Props = {
  cartItems: CartItem[]
};

export const CartList: React.FC<Props> = ({ cartItems }) => {
  return (
    <div className="cart__list">
      {cartItems.map(item => (
        <div className="cart__item" key={item.id}>
          <Item item={item} />
        </div>
      ))}
    </div>
  );
};
