import React, { useMemo } from 'react';
import './Card.scss';
import { Link, useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames/bind';

import { setProduct, removeProduct } from '../../store/favorites';
import { getFavorites } from '../../store/index';

type Props = {
  product: Slide;
};

export const Card: React.FC<Props> = ({ product }) => {
  const {
    imageUrl,
    name,
    price,
    discount,
    screen,
    capacity,
    ram,
    id,
  } = product;

  const { path } = useRouteMatch();
  const dispatch = useDispatch();
  const favorites = useSelector(getFavorites);


  const addToFavorites = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (e.target.checked) {
      dispatch(setProduct(product));
    } else {
      dispatch(removeProduct(product.id));
    }
  };

  // useCallback(addToFavorites, []);

  const isInFavorites = useMemo(() => (
    favorites.some(productFav => productFav.id === product.id)
  ), [favorites, product]);

  return (
    <div className="Wrap">
      <article className="Card">
        <Link to={`${path}/${id}`}>
          <img alt="card" src={imageUrl} className="Card__Img" />
        </Link>
        <div className="Card__ContainerInner">
          <Link to={`${path}/${id}`}>
            <h3 className="Card__Title">{name}</h3>
          </Link>
          <span className="Card__Prise">
            $
            {(price - price * (discount / 100))}
          </span>
          {' '}
          {discount !== 0
            && (
              <span className="Card__OldPrise">
                $
                {price}
              </span>
            )}
          <div className="Card__Info">
            <div className="Card__InfoScreen Card__Item">
              <p className="Card__InfoScreen_Name">Screen</p>
              <p className="Card__InfoScreen_Value">{screen}</p>
            </div>
            <div className="Card__InfoScreen Card__Item">
              <p className="Card__InfoScreen_Name">Capacity</p>
              <p className="Card__InfoScreen_Value">{capacity}</p>
            </div>
            <div className="Card__InfoScreen Card__Item">
              <p className="Card__InfoScreen_Name">RAM</p>
              <p className="Card__InfoScreen_Value">{ram}</p>
            </div>
          </div>
          <div className="Card__ButtonWrap">
            <button
              type="button"
              className="Card__ButtonCart"
            >
              Add to cart
            </button>
            <label
              className={cn('ButtonFavor',
                {
                  'ButtonFavor--isInFavorites': isInFavorites,
                })}
              htmlFor={`ButtonFavor__${product.id}`}
            >
              <input
                type="checkbox"
                id={`ButtonFavor__${product.id}`}
                checked={isInFavorites}
                className="ButtonFavor__Input"
                onChange={(e) => addToFavorites(e)}
              />
            </label>
          </div>
        </div>
      </article>
    </div>
  );
};
