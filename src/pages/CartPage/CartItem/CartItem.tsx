import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import themeStyles from '../../../styles/utils/themeStyles';
import {
  removeItemFromCart,
  updateItemQuantity,
} from '../../../features/cartItems';
import type { CartItem as CartItemType } from '../../../features/cartItems';
import './CartItem.scss';
import classNames from 'classnames';

type Props = {
  itemData: CartItemType;
};

export const CartItem: React.FC<Props> = ({ itemData }) => {
  const dispatch = useDispatch();

  const currentTheme = useSelector(
    (state: RootState) => state.currentTheme.theme,
  );

  const { remove, minus, plus } = themeStyles(currentTheme === 'light-theme');

  const onRemoveButtonClick = () => {
    dispatch(removeItemFromCart(itemData.id));
  };

  const onIncreaseQuantity = () => {
    dispatch(
      updateItemQuantity({ id: itemData.id, quantity: itemData.quantity + 1 }),
    );
  };

  const onDecreaseQuantity = () => {
    dispatch(
      updateItemQuantity({ id: itemData.id, quantity: itemData.quantity - 1 }),
    );
  };

  return (
    <div className="cart-item">
      <div className="cart-item__top">
        <img
          onClick={() => onRemoveButtonClick()}
          className="icon"
          src={remove}
          alt="Remove item"
        />

        <div className="cart-item__info-container">
          <div className="cart-item__image-block">
            <img
              className="cart-item__image"
              src={itemData.image}
              alt="Product Image"
            />
          </div>

          <p className="body-text">{itemData.name}</p>
        </div>
      </div>

      <div className="cart-item__bottom">
        <div className="cart-item__count">
          <button
            disabled={itemData.quantity <= 1}
            className={classNames('card-item-button', {
              disabled: itemData.quantity <= 1,
            })}
            onClick={onDecreaseQuantity}
          >
            <img src={minus} alt="" />
          </button>

          <span className="body-text">{itemData.quantity}</span>

          <button className="card-item-button" onClick={onIncreaseQuantity}>
            <img src={plus} alt="" />
          </button>
        </div>

        <h3 className="cart-item__price">{`$${itemData.price * itemData.quantity}`}</h3>
      </div>
    </div>
  );
};
