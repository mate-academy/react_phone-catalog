import React, { useContext } from 'react';
import './CardStyle.scss';
import { Product } from 'src/types/Product';
import { Link } from 'react-router-dom';
import { DispatchContext, StateContext } from 'src/store';
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
  const { image, name, price, fullPrice, screen, capacity, ram, category } =
    data;
  const dispatch = useContext(DispatchContext);
  const { cart, favourites } = useContext(StateContext);

  const isIndludeCard = !!cart.find(elem => elem.itemId == data.itemId);
  const isLiked = favourites.find(elem => elem.itemId === data.itemId);

  const productLink = `/${category}/${data.itemId}`;

  return (
    <div className="card">
      <div className="card__container">
        <div className="card__header">
          <Link to={productLink} className="card__image--wrapper">
            <img src={`${image}`} alt="" className="card__image" />
          </Link>
        </div>
        <Link to={productLink} className="card__title">
          {name}
        </Link>
        <div className="card__footer">
          <div className="card__text">
            <div className="card__price">
              <h3 className="card__price--main">${price}</h3>
              <div className="card__price--discount">${fullPrice}</div>
            </div>
          </div>
          <hr className="card__line" />
          <div className="card__parameters">
            <div className="card__parameters--screen">
              <div className="card__parameters--title">Screen</div>
              <div className="card__parameters--sub-title">{screen}</div>
            </div>
            <div className="card__parameters--capacity">
              <div className="card__parameters--title">Capacity</div>
              <div className="card__parameters--sub-title">{capacity}</div>
            </div>
            <div className="card__parameters--ram">
              <div className="card__parameters--title">RAM</div>
              <div className="card__parameters--sub-title">{ram}</div>
            </div>
          </div>
          <div className="card__buttons">
            {isIndludeCard ? (
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
                <img src="icons/like.svg" alt="" />
              </button>
            ) : (
              <button
                className="card__buttons--like button-liked"
                onClick={() => handleRemoveFromFavourite(dispatch, data)}
              >
                <img src="icons/liked.svg" alt="" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
