import './Item.scss';
import { Link } from 'react-router-dom';
import React, { useMemo } from 'react';
import classNames from 'classnames';
import { Phone } from '../../types/Phone';
import { addFavourite, removeFavourite } from '../../features/favouriteSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import { addWithdraw, deleteWithdraw } from '../../features/withdrawSlice';
import { BASE_URL } from '../../utils/api';

type Props = {
  item: Phone,
};

export const Item: React.FC<Props> = ({
  item,
}) => {
  const favourites = useAppSelector((state: RootState) => (
    state.favorite.favorites));
  const withdraw = useAppSelector((state: RootState) => (
    state.withdraw.withdraw));

  const dispatch = useAppDispatch();

  const isWithdraw = useMemo(() => {
    return Object.keys(withdraw).includes(item.id);
  }, [withdraw]);

  const isFavorite = useMemo(() => {
    return favourites.includes(item.id);
  }, [favourites]);

  const buttonHandle = (place: string) => {
    if (place === 'favorite') {
      if (isFavorite) {
        dispatch(removeFavourite(item.id));
      } else {
        dispatch(addFavourite(item.id));
      }
    } else if (place === 'withdraw') {
      if (isWithdraw) {
        dispatch(deleteWithdraw(item.id));
      } else {
        dispatch(addWithdraw(item));
      }
    }
  };

  return (
    <div
      className="item"
    >
      <Link
        className="item__header"
        to={`/phones/${item.id}`}
      >
        <div className="item__photo-container">
          <img
            src={`${BASE_URL}/${item.imageUrl}`}
            alt={item.id}
            className="item__photo"
          />
        </div>

        <h2 className="item__title">
          {item.name}
        </h2>
      </Link>

      <div className="item__body">
        <div className="item__price">
          {item.discount
            ? (
              <>
                <p className="item__counted">
                  {Math.ceil(item.price * ((100 - item.discount) / 100))}
                </p>

                <p className="item__initial-price">
                  {item.price}
                </p>
              </>
            )
            : (
              <p className="item__counted">
                {item.price}
              </p>
            )}
        </div>

        <div className="item__specs specs">
          <ul className="item__specs specs__list">
            <li className="specs__item">
              <p className="specs__name">
                Screen
              </p>
              <p className="specs__value">
                {item.screen}
              </p>
            </li>
            <li className="specs__item">
              <p className="specs__name">
                Capacity
              </p>
              <p className="specs__value">
                {item.capacity}
              </p>
            </li>
            <li className="specs__item">
              <p className="specs__name">
                RAM
              </p>
              <p className="specs__value">
                {item.ram}
              </p>
            </li>
          </ul>
        </div>

        <div className="item__buttons">
          <button
            type="button"
            className={classNames(
              'item__buy',
              { 'item__buy--selected': isWithdraw },
            )}
            onClick={() => buttonHandle('withdraw')}
          >
            {isWithdraw ? 'Added to cart' : 'Add to cart'}
          </button>

          <button
            type="button"
            aria-label="favorite"
            className={classNames(
              'item__favorite',
              { 'item__favorite--active': isFavorite },
            )}
            onClick={() => buttonHandle('favorite')}
          />
        </div>
      </div>
    </div>
  );
};
