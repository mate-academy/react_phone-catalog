import { IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Card.scss';
import {
  delFavorites, delFromCart, setFavorites, setSelectedCart,
} from '../../../store/actions';
import {
  getFavoritesSelector,
  getSelectedCartSelector,
} from '../../../store/selectors';
import { Product } from '../../../react-app-env';

type Props = {
  age: number,
  id: string,
  type: string,
  imageUrl: string,
  name: string,
  snippet: string,
  price: number,
  discount: number,
  screen: string,
  capacity: string,
  ram: string,
};

export const Card: React.FC<Props> = ({
  age,
  id,
  type,
  imageUrl,
  name,
  snippet,
  price,
  discount,
  screen,
  capacity,
  ram,
}) => {
  const dispatch = useDispatch();
  const currentFavorite = useSelector(getFavoritesSelector);
  const currentSelectedCart = useSelector(getSelectedCartSelector);
  const currentPrice = price * (1 - discount / 100);
  const [currentId, setCurrentId] = useState('');
  const [isSelected, setIsSelected] = useState(false);
  const [isAddedProduct, setIsAddedProduct] = useState(false);

  const handlerSelectedToCart = (obj: Product, index: string) => {
    if (currentSelectedCart.some(item => item.id === index)) {
      dispatch(delFromCart(obj));
    } else {
      dispatch(setSelectedCart(obj));
    }
  };

  const handlerAddOrDelete = () => {
    if (currentFavorite.includes(currentId)) {
      dispatch(delFavorites(id));
    } else {
      dispatch(setFavorites(id));
    }
  };

  return (
    <div data-cy="cardsContainer" className="card">
      <NavLink to={`/product/${id}`}>
        <div className="card__box-image">

          <img
            src={imageUrl}
            alt={name}
          />

        </div>
      </NavLink>

      <div className="card__name-phone">
        <p className="card__name">{name}</p>
      </div>

      <div className="card__box-price-phone">
        <h2 className="card__current-price">
          $
          {currentPrice}
        </h2>
        <h2 className={discount === 0
          ? 'card__prev-price--none'
          : 'card__prev-price'}
        >
          $
          {price}
        </h2>
      </div>

      <div className="card__divider" />

      <div className="card__box-info">
        <div className="card__screen-name">
          <p className="card__text-features">Screen</p>
          <p className="card__value-features">{screen}</p>
        </div>

        <div className="card__capacity-name">
          <p className="card__text-features">Capacity</p>
          <p className="card__value-features">{capacity}</p>
        </div>

        <div className="card__ram-name">
          <p className="card__text-features">RAM</p>
          <p className="card__value-features">{ram}</p>
        </div>
      </div>

      <div className="card__box-buttons">
        <button
          type="button"
          className={isAddedProduct
            ? 'card__addtocart--pressed card__text-addtocart--pressed'
            : 'card__addtocart'}
          onClick={() => {
            const obj = {
              age,
              id,
              type,
              imageUrl,
              name,
              snippet,
              price,
              discount,
              screen,
              capacity,
              ram,
            };

            setIsAddedProduct(!isAddedProduct);
            handlerSelectedToCart(obj, id);
          }}
        >
          {isAddedProduct ? 'Selected' : 'Add to cart'}
        </button>
        <IconButton
          size="small"
          sx={{ padding: 0 }}
          onClick={() => {
            setCurrentId(id);
            setIsSelected(!isSelected);
            handlerAddOrDelete();
          }}
        >
          <div className="card__rectangle">
            <div className={(currentId === id && isSelected)
              ? 'card__favorites_selected'
              : 'card__favorites'}
            />
          </div>
        </IconButton>
      </div>

    </div>
  );
};
