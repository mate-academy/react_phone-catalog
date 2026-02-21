import { UpdatedProduct } from '../../shared/Types/types';
import { CartItem } from './CartItem';

interface Props {
  cartList: UpdatedProduct[];
}

export const CartList: React.FC<Props> = ({ cartList }) => {
  return (
    <div className="cart__list">
      {cartList.map(item => (
        <CartItem key={item.id} cartItem={item} />
      ))}
    </div>
  );
};
