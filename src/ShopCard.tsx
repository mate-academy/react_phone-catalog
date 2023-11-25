/* eslint-disable max-len */
import React from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { Iphone } from './types/Iphone';
import { useAppSelector } from './utils/hooks';
import { addItem, removeItem } from './redux/cartReducer';
import { addFavorite, removeFavorite } from './redux/favoriteReducer';

type Props = {
  iphone: Iphone,
  // eslint-disable-next-line react/require-default-props
  iphoneTitleRef?: () => void,
};

export const ShopCard: React.FC<Props> = ({
  iphone,
  iphoneTitleRef,
}) => {
  const baseUrl = 'https://mate-academy.github.io/react_phone-catalog/_new/';
  const dispatch = useDispatch();

  const items = useAppSelector((state) => state.cart.items);
  const favouriteItems = useAppSelector(state => state.favorite.list);
  const isSelectedToCart = items.some((item) => item && item.id === iphone?.id);
  const isLiked = favouriteItems.some((item) => item && item.id === iphone?.id);

  const handleAddToCart = () => {
    dispatch(addItem(iphone));

    if (isSelectedToCart) {
      dispatch(removeItem(iphone));
    }
  };

  const handleAddToFavorites = () => {
    dispatch(addFavorite(iphone));

    if (isLiked) {
      dispatch(removeFavorite(iphone));
    }
  };

  return (
    <div className="shop__card">

      <div className="shop__card__container">
        <NavLink
          className="shop__card-title"
          to={`/phones/${iphone.phoneId}`}
          ref={iphoneTitleRef}
        >

          <img
            src={`${baseUrl}${iphone.image}`}
            className="shop__card__photo"
            alt="Iphone"
          />
          <NavLink
            className="shop__card-title"
            to={`/phones/${iphone.phoneId}`}
            ref={iphoneTitleRef}
          >
            {iphone.name}
          </NavLink>
          <div className="shop__card__prices">
            <div className="shop__card-price">{`$${iphone.price}`}</div>
            <div className="shop__card-price--crossed">{`$${iphone.fullPrice}`}</div>

          </div>
          <table className="shop__card__description">
            <tbody>
              <tr className="shop__card__description-row">
                <td className="shop__card__description-property">Screen</td>
                <td className="shop__card__description-value">{iphone.screen}</td>
              </tr>
              <tr className="shop__card__description-row">
                <td className="shop__card__description-property">Capacity</td>
                <td className="shop__card__description-value">{iphone.capacity}</td>
              </tr>
              <tr className="shop__card__description-row">
                <td className="shop__card__description-property">RAM</td>
                <td className="shop__card__description-value">{iphone.ram}</td>
              </tr>
            </tbody>
          </table>
        </NavLink>
        <div className="button__container shop__card__buttons">
          <button
            type="button"
            onClick={() => handleAddToCart()}
            className={classNames('button', 'button--add', {
              'button--add--selected': isSelectedToCart,
            })}
          >
            {!isSelectedToCart ? 'Add to cart' : 'Added to cart'}
          </button>

          <button
            type="button"
            onClick={handleAddToFavorites}
            className="button button--like"
          >
            {isLiked
              ? (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M11.3 1.29877C10.7264 1.29877 10.1584 1.41178 9.62852 1.63136C9.09865 1.85091 8.61711 2.17281 8.21162 2.57846L8.00005 2.79003L7.78835 2.57834C6.96928 1.75927 5.85839 1.29912 4.70005 1.29912C3.54171 1.29912 2.43081 1.75927 1.61174 2.57834C0.792668 3.39741 0.33252 4.50831 0.33252 5.66665C0.33252 6.82499 0.792668 7.93589 1.61174 8.75496L7.50507 14.6483C7.77844 14.9217 8.22165 14.9217 8.49502 14.6483L14.3884 8.75496C14.794 8.34947 15.1158 7.86805 15.3353 7.33817C15.5549 6.80825 15.6679 6.24026 15.6679 5.66665C15.6679 5.09304 15.5549 4.52505 15.3353 3.99513C15.1158 3.46531 14.7941 2.98392 14.3885 2.57846C13.983 2.17276 13.5015 1.85093 12.9716 1.63136C12.4416 1.41178 11.8737 1.29877 11.3 1.29877Z" fill="#EB5757" />
                </svg>
              )
              : (
                <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M9.62846 0.631356C10.1584 0.411782 10.7264 0.298767 11.3 0.298767C11.8736 0.298767 12.4416 0.411782 12.9715 0.631356C13.5014 0.85093 13.9829 1.17276 14.3884 1.57846C14.794 1.98392 15.1157 2.46531 15.3353 2.99513C15.5549 3.52505 15.6679 4.09304 15.6679 4.66665C15.6679 5.24026 15.5549 5.80825 15.3353 6.33817C15.1157 6.86805 14.7939 7.34947 14.3883 7.75496C14.3883 7.755 14.3883 7.75492 14.3883 7.75496L8.49496 13.6483C8.22159 13.9217 7.77838 13.9217 7.50501 13.6483L1.61168 7.75496C0.792607 6.93589 0.332458 5.82499 0.332458 4.66665C0.332458 3.50831 0.792607 2.39741 1.61168 1.57834C2.43075 0.759273 3.54165 0.299124 4.69999 0.299124C5.85833 0.299124 6.96922 0.759273 7.78829 1.57834L7.99999 1.79003L8.21156 1.57846C8.21152 1.5785 8.2116 1.57842 8.21156 1.57846C8.61705 1.17281 9.09859 0.850909 9.62846 0.631356ZM13.3982 2.56818C13.1227 2.29255 12.7956 2.0739 12.4356 1.92472C12.0756 1.77555 11.6897 1.69877 11.3 1.69877C10.9103 1.69877 10.5244 1.77555 10.1644 1.92472C9.80435 2.0739 9.47724 2.29255 9.20174 2.56818L8.49496 3.27496C8.22159 3.54833 7.77838 3.54833 7.50501 3.27496L6.79834 2.56829C6.24182 2.01177 5.48702 1.69912 4.69999 1.69912C3.91295 1.69912 3.15815 2.01177 2.60163 2.56829C2.04511 3.12481 1.73246 3.87961 1.73246 4.66665C1.73246 5.45369 2.04511 6.20849 2.60163 6.76501L7.99999 12.1634L13.3983 6.76501C13.674 6.48951 13.8927 6.16229 14.0419 5.80227C14.1911 5.44224 14.2679 5.05635 14.2679 4.66665C14.2679 4.27695 14.1911 3.89106 14.0419 3.53103C13.8927 3.17101 13.6739 2.84367 13.3982 2.56818Z" fill="#333333" />
                </svg>
              )}
          </button>

        </div>
      </div>
    </div>
  );
};
