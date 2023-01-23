import classNames from 'classnames';
import { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import { Path } from '../../components/Path';
import './Withdraw.scss';
import '../../styles/grid.scss';
import {
  decreaseAmount,
  deleteWithdraw,
  encreaseAmount,
} from '../../features/withdrawSlice';
import { BASE_URL } from '../../utils/api';

export const Withdraw: React.FC = () => {
  const dispatch = useAppDispatch();

  const withdraws = useAppSelector((state: RootState) => (
    state.withdraw.withdraw
  ));

  const title = () => {
    const paths = window.location.hash.slice(2);

    return paths[0].toUpperCase() + paths.slice(1);
  };

  const totalPrice = useMemo(() => (
    Object.values(withdraws).reduce((prev, curr) => (
      prev + Math.ceil(
        curr.amount * curr.price * ((100 - curr.discount) / 100),
      )), 0)
  ), [withdraws]);

  const deleteItemHandle = (id: string) => {
    dispatch(deleteWithdraw(id));
  };

  const amountActionHandle = (type: string, id: string) => {
    if (type === 'add') {
      dispatch(encreaseAmount([1, id]));
    } else if (type === 'remove') {
      dispatch(decreaseAmount([1, id]));
    }
  };

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
                      className={classNames(
                        'withdraw__itembtn',
                        { 'withdraw__itembtn--active': item.amount > 1 },
                      )}
                      onClick={() => amountActionHandle('remove', item.id)}
                    >
                      -
                    </button>

                    <div className="withdraw__container">
                      <p className="withdraw__amount">{item.amount}</p>
                    </div>

                    <button
                      type="button"
                      className="withdraw__itembtn withdraw__itembtn--active"
                      onClick={() => amountActionHandle('add', item.id)}
                    >
                      +
                    </button>
                  </div>
                  <p className="withdraw__price">
                    {`$${Math.ceil(item.amount * item.price * ((100 - item.discount) / 100))}`}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid__item grid__item-17-24 withdraw__checkout">
          <p className="withdraw__total-price">
            {`$${totalPrice}`}
          </p>
          <p className="withdraw__inner-text">{`Total for ${Object.keys(withdraws).length} items`}</p>
          <button
            type="button"
            className="withdraw__button"
          >
            Checkout
          </button>
        </div>
      </div>
    </section>
  );
};
