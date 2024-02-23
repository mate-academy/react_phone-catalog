import { NavLink } from 'react-router-dom';
import { CartObject } from '../../store/models/cart';
import { Icons } from '../../types/enums/Icons';
import { BASE_URL } from '../../utils/fetchClient';
import { Icon } from '../Icon';
import './CartItem.scss';

interface Props {
  cartItem: CartObject,
  onIncrement: (id: string) => void,
  onDecrement: (id: string) => void,
  onRemove: (id: string) => void,
}

export const CartItem: React.FC<Props> = ({
  cartItem,
  onIncrement,
  onDecrement,
  onRemove,
}) => (
  <div className="cart-item">

    <div className="cart-item__main-info">
      <button
        aria-label="removeItem"
        type="button"
        className="cart-item__remove-button"
        onClick={() => onRemove(cartItem.product.id)}
      >
        <Icon icon={Icons.Close} />
      </button>
      <NavLink
        to={`/${cartItem.product.category}/${cartItem.product.phoneId}`}
        className="cart-item__link"
      >
        <img
          className="cart-item__image"
          src={`${BASE_URL}${cartItem.product.image}`}
          alt="productImage"
        />
        <p className="cart-item__title">{cartItem.product.name}</p>
      </NavLink>
    </div>

    <div className="cart-item__controls">
      <button
        type="button"
        className="cart-item__val-button"
        onClick={() => onDecrement(cartItem.product.id)}
        disabled={cartItem.quantity <= 1}
      >
        -
      </button>
      <span className="cart-item__quantity">{cartItem.quantity}</span>
      <button
        type="button"
        className="cart-item__val-button"
        onClick={() => onIncrement(cartItem.id)}
        disabled={cartItem.quantity >= 99}
      >
        +
      </button>
    </div>
    <h2 className="cart-item__price">
      {`$${cartItem.product.price * cartItem.quantity}`}
    </h2>
  </div>
);
