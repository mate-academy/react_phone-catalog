import { Link } from 'react-router-dom';
import { AddToCard } from '../../Types/AddToCard';
import Cross from '../../icons/Cross.svg';
import './CartItem.scss';
import Minus from '../../icons/Minus.svg';
import Plus from '../../icons/Plus.svg';
import { useAppDispatch } from '../../features/hooks';
import {
  decreaseItem, removeItem, increaseItems,
} from '../../features/cart/cartSlice';

type Props = {
  item: AddToCard;
};

const CartItem:React.FC<Props> = ({ item }) => {
  const {
    id,
    title,
    imageUrl,
    color,
    price,
    capasity,
    count,
  } = item;

  const dispatch = useAppDispatch();
  const onClickPlus = () => {
    dispatch(increaseItems({
      id,
      color,
      capasity,
    }));
  };

  const onClickMinus = () => {
    dispatch(decreaseItem({
      id,
      color,
      capasity,
    }));
  };

  const onClickclear = () => {
    dispatch(removeItem({
      id,
      color,
      capasity,
    }));
  };

  return (
    <>
      <div className="card">
        <div className="card__container">
          <button
            type="button"
            className="card__delete"
            onClick={onClickclear}
          >
            <img src={Cross} alt="" className="card__img-cross" />
          </button>
          <Link to={`/phones/${id}`}>
            <img src={imageUrl} alt="" className="card__image" />
          </Link>
          <Link to={`/phones/${id}`}>
            <div className="card__name">
              <div className="card__name__char">
                {title}
              </div>
              <div className="card__name__char">
                {color}
              </div>
              <div className="card__name__char">
                {`${capasity}GB`}
              </div>
            </div>
          </Link>
        </div>

        <div className="card__container">
          <button
            type="button"
            className="card__action-quantity"
            disabled={count === 1}
            onClick={onClickMinus}
          >
            <img src={Minus} alt="" />
          </button>
          <span className="card__quantity">{count}</span>
          <button
            type="button"
            className="card__action-quantity"
            onClick={onClickPlus}
          >
            <img src={Plus} alt="" />
          </button>
          <div className="card__price">{`$${price}`}</div>
        </div>
      </div>
    </>
  );
};

export default CartItem;
