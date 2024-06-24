import React, { useContext, useEffect, useState } from 'react';
import './CardStyle.scss';
import { Product } from 'src/types/Product';
import { Link } from 'react-router-dom';
import { DispatchContext, StateContext } from 'src/store';
import { ActionTypes } from 'src/types/ActionTypes';
import {
  handleAddFavourite,
  handleAddToCart,
  handleRemoveFromCart,
  handleRemoveFromFavourite,
} from '.';

type Props = {
  data: Product;
  type?: string;
};

const Card: React.FC<Props> = ({ data }) => {
  const dispatch = useContext(DispatchContext);
  const { cart, favourites } = useContext(StateContext);
  const [type, setType] = useState(data.category);

  const isIndludeCard = cart.find(elem => elem.itemId == data.itemId);
  const isLiked = favourites.find(elem => elem.itemId === data.itemId);

  useEffect(() => {
    // Якщо тип не переданий через пропси,
    // отримати його з продукту або контексту
    if (!type && data.category) {
      setType(data.category);
    }
  }, [type, data]);

  const handleClick = () => {
    dispatch({ type: ActionTypes.AddSelectedProduct, payload: data });
  };

  const productLink = type ? `/${type}/${data.itemId}` : `/${data.itemId}`;

  return (
    <div className="card">
      <div className="card__container">
        <Link
          to={productLink}
          className="card__image--wrapper"
          onClick={() => handleClick()}
        >
          <img src={`/${data.image}`} alt="" className="card__image" />
        </Link>
        <Link
          to={productLink}
          className="card__title"
          onClick={() => handleClick()}
        >
          {data.itemId}
        </Link>
        <div className="card__text">
          <div className="card__price">
            <div className="card__price--main">${data.price}</div>
            <div className="card__price--discount">$899</div>
          </div>
        </div>
        <hr className="card__line" />
        <div className="card__parameters">
          <div className="card__parameters--screen">
            <div className="card__parameters--title">Screen</div>
            <div className="card__parameters--sub-title">{data.screen}</div>
          </div>
          <div className="card__parameters--capacity">
            <div className="card__parameters--title">Capacity</div>
            <div className="card__parameters--sub-title">{data.capacity}</div>
          </div>
          <div className="card__parameters--ram">
            <div className="card__parameters--title">RAM</div>
            <div className="card__parameters--sub-title">{data.ram}</div>
          </div>
        </div>
        <div className="card__buttons">
          {!!isIndludeCard ? (
            <button
              className="card__buttons--add button-added"
              onClick={() => handleRemoveFromCart(dispatch, data)}
            >
              Added
            </button>
          ) : (
            <button
              className="card__buttons--add"
              onClick={() => handleAddToCart(dispatch, data)}
            >
              Add to cart
            </button>
          )}

          {!isLiked ? (
            <button
              className="card__buttons--like like"
              onClick={() => handleAddFavourite(dispatch, data)}
            >
              <img src="/icons/like.svg" alt="" />
            </button>
          ) : (
            <button
              className="card__buttons--like button-liked"
              onClick={() => handleRemoveFromFavourite(dispatch, data)}
            >
              <img src="/icons/liked.svg" alt="" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
