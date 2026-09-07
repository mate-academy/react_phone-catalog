import { useCart } from '../../components/Context/CartContext';
import { CardItem } from '../../types/СardItem';
import './cartProduct.scss';
import removeItem from '../Navbar/NavbarImg/Close.svg';
import plus from './cartImg/Plus.svg';
import minus from './cartImg/minus.svg';

type CartItemsProps = {
  item: CardItem;
  quantity: number;
};

export const CartProduct: React.FC<CartItemsProps> = ({ item, quantity }) => {
  const { removeFromCart, changeQuantity } = useCart();

  return (
    <>
      <div className="cartItem">
        <div className="cartItem__info">
          <button
            className="cartItem__remove"
            onClick={() => removeFromCart(item.id)}
          >
            <img src={removeItem} alt="RemoveItem" className="removeImg" />
          </button>
          <img src={item.img} alt={item.name} className="cartItem__img" />
          <div className="cartItem__title">{item.name}</div>
        </div>
        <div className="cartItem__qty">
          <div className="cartItem__action">
            <button
              className="cartItem__button"
              onClick={() => changeQuantity(item.id, -1)}
            >
              <img src={minus} alt="minus" className="removeImg" />
            </button>
            <div className="cartItem__count">{quantity}</div>
            <button
              className="cartItem__button"
              onClick={() => changeQuantity(item.id, +1)}
            >
              <img src={plus} alt="plus" className="removeImg" />
            </button>
          </div>
          <div className="cartItem__price">{item.price * quantity}$</div>
        </div>
      </div>
    </>
  );
};
