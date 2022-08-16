import React, {
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types/Product';
import { CartContext } from '../../context/CartProvider';
import './CartItem.scss';

type Props = {
  item: Product,
  countTotalSum: () => void;
  countTotalQuantity: () => void,
};

export const CartItem: React.FC<Props> = ({
  item,
  countTotalSum,
  countTotalQuantity,
}) => {
  const { removeItem } = useContext(CartContext);

  const {
    priceWithDiscount,
    name,
    type,
    id,
    imageUrl,
  } = item;

  const [count, setCount] = useState(1);

  const increaseCount = () => {
    setCount(count + 1);
  };

  const decreaseCount = () => {
    setCount(count - 1);
  };

  const getLocalStorage = () => {
    if (localStorage.getItem(`quantity${id}`) !== null) {
      setCount(JSON.parse(localStorage.getItem(`quantity${id}`) || '1'));
    }
  };

  const updateStorage = () => {
    if (count !== 1) {
      localStorage.setItem(`quantity${id}`, JSON.stringify(count));
    } else {
      localStorage.removeItem(`quantity${id}`);
    }
  };

  useEffect(() => {
    getLocalStorage();
  }, []);

  useEffect(() => {
    updateStorage();
    item.quantityInOrder = count; // eslint-disable-line no-param-reassign
  }, [count]);

  useEffect(() => {
    countTotalSum();
    countTotalQuantity();
  }, [count, removeItem]);

  const sum = useMemo(() => {
    return priceWithDiscount * count;
  }, [count, removeItem]);

  return (
    <div className="CartItem">
      <div className="CartItem__leftBlock">
        <button
          type="button"
          className="CartItem__removeItem"
          onClick={() => {
            removeItem(item);
          }}
          data-cy="cartDeleteButton"
          aria-label="remove item"
        />
        <Link
          to={`/${type}s/${id}`}
          className="CartItem__label"
        >
          <img
            src={`${imageUrl}`}
            alt={type}
            className="CartItem__img"
          />
        </Link>

        <p className="CartItem__name">
          {name}
        </p>
      </div>
      <div className="CartItem__rightBlock">
        <div className="CartItem__quantityBlock">
          <button
            type="button"
            className="CartItem__increase-decrease"
            disabled={count === 1}
            onClick={() => decreaseCount()}
          >
            -
          </button>
          <p
            className="CartItem__quantity"
            data-cy="productQauntity"
          >
            {count}
          </p>
          <button
            type="button"
            className="CartItem__increase-decrease"
            onClick={() => increaseCount()}
          >
            +
          </button>
        </div>
        <span className="CartItem__totalPrice">
          &#36;
          {sum}
        </span>
      </div>
    </div>
  );
};
