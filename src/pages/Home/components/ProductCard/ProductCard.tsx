import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { actions as cartActions } from '../../../../store/cart';
import { actions as favouriteActions } from '../../../../store/favourites';
import { ProductType } from '../../../../helpers/types';
import './ProductCard.scss';
import { getCartGoods, getFavouritesGoods } from '../../../../store/store';

export const ProductCard: React.FC<ProductType> = ({ product }) => {
  const dispatch = useDispatch();
  const cartGoods = useSelector(getCartGoods);
  const addedToCart: boolean = cartGoods.some(good => good.id === product.id);
  const favouriteGoods = useSelector(getFavouritesGoods);
  const addedToFavorite: boolean = favouriteGoods.some(good => good.id === product.id);

  const addGoodToCart = () => {
    dispatch(cartActions.add(product));
  };

  const removeGoodFromCart = () => {
    dispatch(cartActions.remove(product));
  };

  const addGoodToFavorite = () => {
    dispatch(favouriteActions.add(product));
  };

  const removeGoodFromFavorite = () => {
    dispatch(favouriteActions.remove(product));
  };

  return (
    <div className="ProductCard-Wrapper">
      <div className="ProductCard">
        <Link
          className="ProductCard-Link"
          to={`/${product.type}s/${product.id}`}
        >
          <img
            className="ProductCard-Image"
            src={product.imageUrl}
            alt="phone"
          />

          <h2 className="ProductCard-Title">
            {product.name}
          </h2>
        </Link>

        {product.discount
          ? (
            <div className="Price ProductCard-Price">
              <span className="Price-FinalPrice">
                {`$${product.price * (1 - product.discount / 100)}`}
              </span>
              <s className="Price-WithoutDiscount">
                {`$${product.price}`}
              </s>
            </div>
          )
          : (
            <div className="Price ProductCard-Price">
              <span className="Price-FinalPrice">
                {`$${product.price}`}
              </span>
            </div>
          )}

        <div className="Info ProductCard-Info">
          <div className="Info-Block">
            <div className="Info-Name">
              Screen
            </div>
            <div className="Info-Value">
              {product.screen}
            </div>
          </div>

          <div className="Info-Block">
            <div className="Info-Name">
              Capacity
            </div>
            <div className="Info-Value">
              {product.capacity}
            </div>
          </div>

          <div className="Info-Block">
            <div className="Info-Name">
              RAM
            </div>
            <div className="Info-Value">
              {product.ram}
            </div>
          </div>
        </div>

        <div className="Actions">

          <button
            type="button"
            className={classnames(
              'Actions-CartButton',
              { 'Actions-CartButton_active': addedToCart },
            )}
            onClick={addedToCart
              ? removeGoodFromCart
              : addGoodToCart}
          >
            {addedToCart ? 'Added to cart' : 'Add to cart'}
          </button>

          <button
            type="button"
            className="Actions-FavouriteButton"
            onClick={addedToFavorite
              ? removeGoodFromFavorite
              : addGoodToFavorite}
          >
            <img
              className="test"
              src={addedToFavorite
                ? 'img/icons/favourite-active.png'
                : 'img/icons/favourite.svg'}
              alt="header-favourite"
            />
          </button>
        </div>
      </div>
    </div>
  );
};
