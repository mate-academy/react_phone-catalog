/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import { Path } from '../Path';
import './Withdraw.scss';
import '../../styles/grid.scss';
import {
  decreaseAmount,
  deleteWithdraw,
  encreaseAmount,
} from '../../features/withdrawSlice';
import { BASE_URL } from '../../utils/api';

// interface WithdrawPhone extends Phone {
//   amount?: number,
// }

export const Withdraw: React.FC = () => {
  const dispatch = useAppDispatch();
  // const [withdraw, setWithdraw] = useState<WithdrawPhone[]>([]);
  const [scrollPos, setScrollPos] = useState(window.scrollY);

  const withdraws = useAppSelector((state: RootState) => (
    state.withdraw.withdraw
  ));

  const title = () => {
    const paths = window.location.pathname.split('/');
    const titlePrepared = paths[paths.length - 1];

    return titlePrepared[0].toUpperCase() + titlePrepared.slice(1);
  };

  const deleteItemHandle = (id: string) => {
    setScrollPos(window.scrollY);
    dispatch(deleteWithdraw(id));
  };

  const amountActionHandle = (type:string, id: string) => {
    if (type === 'add') {
      dispatch(encreaseAmount([1, id]));
    } else if (type === 'remove') {
      dispatch(decreaseAmount([1, id]));
    }
  };

  useEffect(() => {
    window.scrollTo(0, scrollPos);
  }, [window.scrollY]);

  return (
    <section className="withdraw">
      <Path pathElems={[title()]} pathBoldElems={[]} />
      <h1 className="withdraw__title">
        Cart
      </h1>
      <div className="grid">
        <div className="grid__item grid__item-1-16">
          <ul>
            {Object.values(withdraws).map(item => (
              <li className="withdraw__item" key={item.id}>
                <div className="withdraw__item-info">
                  <button
                    type="button"
                    aria-label="delete"
                    className="withdraw__cross"
                    onClick={() => deleteItemHandle(item.id)}
                  />

                  <img
                    src={`${BASE_URL}/${item.imageUrl}`}
                    alt={item.id}
                    className="withdraw__img"
                  />

                  <p className="withdraw__text">{item.name}</p>
                </div>

                <div className="withdraw__item-price">
                  <div className="withdraw__counter">
                    <button
                      type="button"
                      className="withdraw__button"
                      onClick={() => amountActionHandle('remove', item.id)}
                    >
                      -
                    </button>

                    <div className="withdraw__container">
                      <p className="withdraw__amount">{item.amount}</p>
                    </div>

                    <button
                      type="button"
                      className="withdraw__button withdraw__button--active"
                      onClick={() => amountActionHandle('add', item.id)}
                    >
                      +
                    </button>
                  </div>
                  <p className="withdraw__price">
                    {`$${Math.ceil(item.price * ((100 - item.discount) / 100))}`}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
