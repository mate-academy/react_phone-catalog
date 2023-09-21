import './CartItem.scss';
import { CartItemType } from '../../types/CartItemType';
import closeIcon from '../../img/Union.svg';
import plusIcon from '../../img/Plus.svg';
import minusIcon from '../../img/Minus.svg';
import { CDN_URL } from '../../http/api';
import { ENDPOINT_GET_PRODUCT_IMAGES } from '../../http/endpoints';
import { useAppDispatch } from '../../app/hooks';
import {
  addItem,
  minusItem,
  removeItem,
} from '../../redux/reducers/cartReducer';

type CartItemProps = {
  item: CartItemType;
};

export const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const itemsPrice = item.price * item.count;
  const dispatch = useAppDispatch();

  const deleteItem = () => {
    dispatch(removeItem(item));
  };

  const onClickPlus = () => {
    dispatch(addItem(item));
  };

  const onClickMinus = () => {
    dispatch(minusItem(item));
  };

  return (
    <div className="cartItem">
      <button
        data-cy="cartDeleteButton"
        type="button"
        className="cartItem__closeIcon-container"
        onClick={deleteItem}
      >
        <img
          src={closeIcon}
          alt="close item"
          className="cartItem__closeIcon"
        />
      </button>
      <div className="cartItem__image-container">
        <img
          src={`${CDN_URL}/${ENDPOINT_GET_PRODUCT_IMAGES}${item.image}`}
          alt="product"
          className="cartItem__image"
        />
      </div>
      <div className="cartItem__productName">
        <p>{item.name}</p>
      </div>
      <div className="cartItem__buttons-container">
        <button
          disabled={item.count === 1}
          type="button"
          className="cartItem__button"
          onClick={onClickMinus}
        >
          <img src={minusIcon} alt="minus" />
        </button>
        <span>{item.count}</span>
        <button
          type="button"
          className="cartItem__button"
          onClick={onClickPlus}
        >
          <img src={plusIcon} alt="add" />
        </button>
      </div>
      <h2 className="cartItem__cost">
        $
        {itemsPrice}
      </h2>
    </div>
  );
};
