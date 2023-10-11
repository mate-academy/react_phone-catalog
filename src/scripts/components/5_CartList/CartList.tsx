import React, {
  useContext,
  useState,
  useEffect,
} from 'react';
import { NavLink } from 'react-router-dom';
import { IGood } from '../../helpers/types/IGood';
import { IBucket } from '../../helpers/types/IBucket';
import { Context } from '../../helpers/context/context';
import './cartList.scss';

import { CartListItem } from '../6_CartListItem/CartListItem';

export const CartList: React.FC = () => {
  const {
    toggleCart,
    cartList,
  } = useContext(Context);

  const bucket = localStorage.getItem('bucket');
  const [total, setTotal] = useState(0);
  const [bucketList, setBucketList] = useState<IBucket[]>([]);

  const totalSum = () => {
    let sum = 0;

    bucketList.map((good: IBucket) => {
      sum += good.total * good.totalSum;

      return good;
    });

    setTotal(sum);
  };

  const addNum = (idNum: string, num: number) => {
    const newArr = bucketList.map(item => {
      if (item.id === idNum) {
        // eslint-disable-next-line no-param-reassign
        item.total = num;
      }

      return item;
    });

    setBucketList(newArr);
    localStorage.setItem('bucket', JSON.stringify(newArr));
  };

  useEffect(() => {
    if (bucket === null) {
      const newArr: IBucket[] = [];

      cartList.map((item: IGood) => {
        newArr.push({
          id: item.id,
          total: 1,
          totalSum: (item.price - (+item.price * +item.discount) / 100),
        });

        return item;
      });

      setBucketList(newArr);
      localStorage.setItem('bucket', JSON.stringify(newArr));
    } else {
      setBucketList(JSON.parse(bucket));
    }
  }, [cartList]);

  return (
    <div className="cartList">
      {cartList.length > 0 && (
        <ul className="cartList__container">
          {cartList.map((good: IGood) => (
            <li
              className="cartList__item"
              key={good.id}
            >
              <div className="cartList__delete">
                <button
                  title="Delete item"
                  type="button"
                  data-cy="cartDeleteButton"
                  className="cartList__button-added"
                  onClick={() => {
                    toggleCart(good);
                    setBucketList(bucketList.filter(i => i.id !== good.id));
                    localStorage.setItem('bucket',
                      JSON.stringify(bucketList.filter(i => i.id !== good.id)));
                  }}
                >
                  x
                </button>
              </div>

              <NavLink
                to={`${good.id}`}
              >
                <div className="cartList__wrap-items">
                  <img
                    className="cartList__img"
                    src={`../../${good.imageUrl}`}
                    alt={good.name}
                  />

                  <p className="cartList__title">
                    {good.name}
                  </p>
                </div>
              </NavLink>

              <CartListItem
                good={good}
                addNum={(idNum: string, n: number) => addNum(idNum, n)}
              />
            </li>
          ))}
        </ul>

      )}

      <div className="cartList__total">
        <div className="cartList__price">
          <h2 className="cartList__real">
            {`$${total}`}
          </h2>
          <p className="goodsList__info-title" data-cy="productQauntity">
            {`Total for ${cartList.length} items`}
          </p>
        </div>

        <button
          title="fav"
          type="button"
          className="cartList__button"
          onClick={() => totalSum()}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};
