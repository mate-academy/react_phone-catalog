import { CartItem as CartItemType } from '../../../../types/CartItem';
import './CartItem.scss';
import RemoveIcon from './../../../../img/close-icon.png';
import PlusIcon from './../../../../img/plus-icon.png';
import MinusIcon from './../../../../img/minus-icon.png';

type Props = {
  cart: CartItemType[];
  removeFromCart: (id: number) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
};

export const CartItem: React.FC<Props> = ({
  cart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
}) => {
  return (
    <>
      {cart.map(item => (
        <div className="cart__item" key={item.id}>
          <div
            className="cart__item-remove"
            onClick={() => removeFromCart(item.id)}
          >
            <img src={RemoveIcon} alt="remove-icon" />
          </div>
          <div className="cart__item-img">
            <img src={item.product.image} alt="product-image" />
          </div>
          <div className="cart__item-name">{item.product.name}</div>
          <div className="cart__item-quantity">
            <div
              className={`cart__item-quantity-remove ${item.quantity === 1 ? 'quantity-disabled' : ''}`}
              onClick={() => decreaseQuantity(item.id)}
            >
              <img src={MinusIcon} alt="minus-icon" />
            </div>
            {item.quantity}
            <div
              className="cart__item-quantity-add"
              onClick={() => increaseQuantity(item.id)}
            >
              <img src={PlusIcon} alt="plus-icon" />
            </div>
          </div>
          <div className="cart__item-price">
            ${item.product.price * item.quantity}
          </div>
        </div>
      ))}
    </>
  );
};
