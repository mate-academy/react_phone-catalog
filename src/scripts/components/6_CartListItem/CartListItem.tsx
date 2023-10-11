import React, {
  useState,
  useEffect,
} from 'react';
import { IGood } from '../../helpers/types/IGood';

type Props = {
  good: IGood;
  addNum: (idNum: string, n: number) => void;
};

export const CartListItem: React.FC<Props> = ({ good, addNum }) => {
  const [num, setNum] = useState(1);
  const totalItem = num * (good.price - (+good.price * +good.discount) / 100);

  useEffect(() => addNum(good.id, num), [num]);

  return (
    <>
      <div className="cartList__numbers">
        <button
          title="fav"
          type="button"
          className="cartList__button-num center"
          onClick={() => {
            if (num >= 1) {
              setNum(num - 1);
            }
          }}
        >
          -
        </button>

        <p className="center">
          {num}
        </p>

        <button
          title="fav"
          type="button"
          className="cartList__button-num center"
          onClick={() => setNum(num + 1)}
        >
          +
        </button>
      </div>

      <div className="cartList__price">
        <h2 className="goodsList__real">
          {`$${totalItem}`}
        </h2>
      </div>
    </>
  );
};
