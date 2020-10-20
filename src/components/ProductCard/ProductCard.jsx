import React, { useCallback } from 'react';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators } from '../../redux/cart';
import { actionCreators as actionCreatorsFavorites } from '../../redux/favourites';
import { Link, useRouteMatch, Route } from 'react-router-dom';
import {ProductDetails } from '../ProductDetails/ProductDetails';

export const ProductCard = ({ product }) => {
  const cartItems = useSelector(state => state.cart.items);
  const likedItems = useSelector(state => state.liked.items);
  const dispatch = useDispatch();
  const match = useRouteMatch();
  // console.log(match)
  const addToCart = (item) => {
    const action = actionCreators.addToCart(item);
    dispatch(action);
  };

  const handleLiked = (item) => {
    if (!likedItems.includes(item)) {
      const action = actionCreatorsFavorites.addToLiked(item);
      dispatch(action);
    } else {
      const action = actionCreatorsFavorites.removeFromLiked(item);
      dispatch(action);
    }
  };

  const parseNumber = useCallback((number) =>
    number ? parseFloat(number) + ' MB' : null, []);

  const { imageUrl, name, price, ram, screen, capacity, id } = product;

  return (
    <div className="store__product product">
      <Link to={match.url + id}>
        <img
          src={require(`../../../public/${imageUrl}`)}
          alt={name}
          className="product__photo">
        </img>
      </Link>
   
      <h3 className="product__title">{name}</h3>
      <div className="price product__price">
        <p className="price__current">${price * (100 - product.discount) / 100}</p>
        {product.discount
          ? <p className="price__old">${price}</p>
          : ""}

      </div>
      <div className="product__details details">
        <div className="details__row details__row_1">
          <p className="details__title">Screen</p>
          <p className="details__parameter">{screen}</p>
        </div>
        <div className="details__row details__row_2">
          <p className="details__title">Capacity</p>
          <p className="details__parameter">{parseNumber(capacity)}</p>
        </div>
        <div className="details__row details__row_3">
          <p className="details__title">RAM</p>
          <p className="details__parameter">{parseNumber(ram)}</p>
        </div>
      </div>
      <div className="product__bottom">
        <button
          disabled={cartItems.includes(id)}
          className="product__button button"
          onClick={() => {
            addToCart(id);
          }}
        >
          <span>
            Add to cart
          </span>
          <span>
            Added to cart
          </span>
        </button>
        <button
          type="button"
          className="product__icon-container icon-container icon-container__button"
          onClick={() => { handleLiked(id) }}
        >
          <span className={classNames({
            "icon-container__icon": true,
            "icon-container__icon_favorites": true,
            "icon-container__icon_liked": likedItems.includes(id)
          })}
          >
          </span>
        </button>
      </div>
    </div>
  )
};