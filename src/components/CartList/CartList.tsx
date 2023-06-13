import './CartList.scss';
import { Product } from '../../types/Product';
import { CartItem } from '../CartItem';

type Props = {
  cartItems: Product[];
  removeProductFromCart: (id: string) => void;
};

export const CartList: React.FC<Props> = ({
  cartItems,
  removeProductFromCart,
}) => {
  return (
    <ul className="cart-list">
      {cartItems.map(item => (
        <CartItem
          key={item.id}
          item={item}
          removeProductFromCart={removeProductFromCart}
        />
      ))}
    </ul>
  );
};
