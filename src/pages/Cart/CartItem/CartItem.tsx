import { Link } from 'react-router-dom';
import cn from 'classnames';
import './CartItem.scss';

import { countButton } from './constants';

const buttonClasses = (cond: boolean) => cn(
  'button-block', { 'button-dis': cond },
);

type Props = {
  phoneId: string;
  id: number;
  name: string;
  image: string;
  price: number;
  category: string;
  count: number;
  delCard: (name: string) => void;
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
          className={buttonClasses(count === countButton.min)}
          onClick={() => onChangeCounter(-1)}
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
          className={buttonClasses(count === countButton.max)}
          onClick={() => onChangeCounter(1)}
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
