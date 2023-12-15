import { CartItem as Item } from '../../types/CartItem';
import { CartItem } from './CartItem/CartItem';

interface Props {
  items: Item[];
}

export const CartItems: React.FC<Props> = ({ items }) => (
  <div className="cart__items">
    {items.map((item) => (
      <CartItem item={item} key={item.id} />
    ))}
  </div>
);
