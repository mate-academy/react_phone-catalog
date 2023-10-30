import { CartItem } from '../CartItem/CartItem';
import { PhoneInCart } from '../../types/PhoneInCart';
import './CartItemList.scss';

type Props = {
  inCart: PhoneInCart[];
};

export const CartItemList: React.FC<Props> = ({ inCart }) => {
  return (
    <div className="CartItemList">
      {
        inCart.length > 0 && (
          inCart.map(el => {
            return (
              <CartItem
                key={el.name}
                info={el}
              />
            );
          })
        )
      }
    </div>
  );
};
