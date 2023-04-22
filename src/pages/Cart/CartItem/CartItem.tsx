import { Link } from 'react-router-dom';
import './CartItem.scss';

type Props = {
  name: string;
  image: string;
  price: number;
  phoneId: string;
  category: string;
  delCard: (name: string) => void;
  count: number;
  id: number;
  changeCardCount: (id: number, newCount: number) => void;
};

const CartItem: React.FC<Props> = ({
  name,
  image,
  delCard,
  price,
  category,
  phoneId,
  count,
  id,
  changeCardCount,
}) => {
  const onChangeCounter = (num: number) => {
    changeCardCount(id, num);
  };

  return (
    <li className="cart-item">
      <button
        type="button"
        className="cart-item__cancel"
        onClick={() => delCard(name)}
        data-cy="cartDeleteButton"
      >
        <img src="./icons/cancelDis.svg" alt="icon" />
      </button>

      <Link
        className="cart-item__link"
        to={`/${category}/${phoneId}`}
      >
        <img className="cart-item__img" src={image} alt="product" />

        <h3 className="cart-item__name">
          {name}
        </h3>
      </Link>

      <div className="cart-item__count-block">
        <button
          type="button"
          className="cart-item__count-button"
          onClick={() => onChangeCounter(-1)}
          disabled={count === 1}
        >
          <img src="./icons/minus.svg" alt="icon" />
        </button>
        <span
          className="cart-item__count"
          data-cy="productQauntity"
        >
          {count}
        </span>
        <button
          type="button"
          className="cart-item__count-button"
          onClick={() => onChangeCounter(1)}
          disabled={count === 100}
        >
          <img src="./icons/plus.svg" alt="icon" />
        </button>
      </div>

      <span className="cart-item__price">
        {`$${price}`}
      </span>
    </li>
  );
};

export default CartItem;
