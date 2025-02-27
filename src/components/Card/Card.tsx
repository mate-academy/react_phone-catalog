import { useContext } from 'react';
import { Product } from '../../types';
import './Card.scss';
import { LangContext } from '../../context/LangContext';
import { translate } from '../../utils/translate';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { favouriteSlice } from '../../features/favouriteSlice';
import { cartSlice } from '../../features/cartSlice';

type Props = {
  item: Product;
  discount: boolean;
};

export const Card: React.FC<Props> = ({ item, discount }) => {
  const { lang } = useContext(LangContext);
  const { favouriteGoods } = useAppSelector(state => state.favourites);
  const { cartGoods } = useAppSelector(state => state.cart);
  const dispatch = useAppDispatch();

  const isItemInCart = cartGoods.some(good => good.id === item.id);
  const isItemInFavourites = favouriteGoods.some(good => good.id === item.id);

  return (
    <article className="card">
      <div className="card__container">
        <Link
          to={`/${item.category}/${item.id}`}
          className="card__link--photo-link"
        >
          <img
            src={item.images[0]}
            alt={`photo ${item.id}`}
            className="card__link--photo"
          />
        </Link>
        <Link
          to={`/${item.category}/${item.id}`}
          className="card__link--name-link body-text"
        >
          <div>{item.name}</div>
        </Link>
        <div className="card__prices">
          <div className="card__price">{`$${item.priceDiscount}`}</div>
          {discount && (
            <div className="card__price--discount">{`$${item.priceRegular}`}</div>
          )}
        </div>
        <div className="card__separator"></div>
        <ul className="card__list">
          <li className="card__list--item">
            <p className="card__list--name small-text">
              {translate('card.screen', lang)}
            </p>
            <p className="card__list--value">{item.screen.slice(0, 9)}</p>
          </li>
          <li className="card__list--item">
            <p className="card__list--name small-text">
              {translate('card.capacity', lang)}
            </p>
            <p className="card__list--value">{item.capacity}</p>
          </li>
          <li className="card__list--item">
            <p className="card__list--name small-text">RAM</p>
            <p className="card__list--value">{item.ram}</p>
          </li>
        </ul>
        <div className="card__buttons">
          <button
            className={classNames('card__button--add', {
              'in-cart': isItemInCart,
            })}
            onClick={() => {
              if (isItemInCart) {
                dispatch(
                  cartSlice.actions.removeGood({ ...item, quantity: 1 }),
                );
              } else {
                dispatch(cartSlice.actions.addGood({ ...item, quantity: 1 }));
              }
            }}
          >
            {isItemInCart
              ? translate('card.button.added', lang)
              : translate('card.button', lang)}
          </button>
          <button
            className={classNames('card__button icon icon--heart button', {
              'is-favorite': isItemInFavourites,
            })}
            onClick={() => {
              if (isItemInFavourites) {
                dispatch(favouriteSlice.actions.removeGood(item));
              } else {
                dispatch(favouriteSlice.actions.addGood(item));
              }
            }}
          ></button>
        </div>
      </div>
    </article>
  );
};
