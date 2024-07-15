import { useDispatch } from 'react-redux';
import { Gadget } from '../../types/Gadget';
import './CartItem.scss';
import { addCart, clearCart, removeCart } from '../../features/cart';

type Props = {
  product: Gadget & { count: number };
};

export const CartItem: React.FC<Props> = ({ product }) => {
  const { image, name, price, id, count } = product;
  const dispatch = useDispatch();

  const addItem = () => dispatch(addCart(id));
  const takeItem = () => dispatch(removeCart(id));
  const clearItem = () => dispatch(clearCart(id));

  const disabledBtn = count === 1;

  return (
    <div className="cart-card">
      <div className="cart-card__descr">
        <button
          type="button"
          className="cart-card__descr--btn"
          onClick={clearItem}
        >
          <svg className="icon icon-delete">
            <use href="img/icons.svg#icon-close"></use>
          </svg>
        </button>
        <img className="cart-card__descr--img" src={image} alt={name} />
        <p className="cart-card__descr--name">{name}</p>
      </div>
      <div className="cart-card__store">
        <div className="cart-card__store--buttons store-buttons">
          <button
            type="button"
            className="store-buttons__btn"
            onClick={takeItem}
            disabled={disabledBtn}
          >
            <svg className="icon icon-minus">
              <use href="img/icons.svg#icon-minus"></use>
            </svg>
          </button>
          <p className="store-buttons__count">{count}</p>
          <button
            type="button"
            className="store-buttons__btn"
            onClick={addItem}
          >
            <svg className="icon icon-plus">
              <use href="img/icons.svg#icon-plus"></use>
            </svg>
          </button>
        </div>
        <p className="cart-card__store--price">${price}</p>
      </div>
    </div>
  );
};
