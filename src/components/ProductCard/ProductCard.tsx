/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useState } from 'react';
import classNames from 'classnames';
import './ProductCard.scss';
import { Link } from 'react-router-dom';
import { Product } from '../../types/Product';
import { ProductsContext } from '../../helpers/ProductsContext';

type Props = {
  product: Product,
};

export const ProductCard: React.FC<Props> = ({
  product,
}) => {
  const {
    favorites,
    setFavorites,
    cartItems,
    setCartItems,
  } = useContext(ProductsContext);
  const [tempFavorites, setTempFavorites] = useState([...favorites]);
  const calculateDiscount = (price: number, discount: number) => (
    Math.round(price - price * (discount / 100))
  );

  const getLink = (targetProduct: Product) => {
    switch (targetProduct.type) {
      case 'phone':
        return `../phones/${targetProduct.id}`;
      case 'tablet':
        return `../tablets/${targetProduct.id}`;
      case 'accessories':
        return `../accessories/${targetProduct.id}`;
      default:
        return '';
    }
  };

  const handleFavoriteClick = () => {
    if (favorites.find(prod => prod.name === product.name)) {
      const newFavorites = favorites.filter(prod => prod.name !== product.name);

      setTempFavorites(newFavorites);
      setFavorites(newFavorites);

      return;
    }

    setTempFavorites([...favorites, product]);
    setFavorites([...favorites, product]);
  };

  const handleBuyButton = () => {
    if (cartItems.find(prod => prod.name === product.name)) {
      const newCartProducts = cartItems.filter(prod => (
        prod.name !== product.name
      ));

      setCartItems(newCartProducts);

      return;
    }

    setCartItems([...cartItems, product]);
  };

  return (

    <div
      className="cards-container"
      data-cy="cardsContainer"
    >
      <div className="card">
        <Link
          to={getLink(product)}
          className="card__product-link"
        >
          <div className="card__product-image">
            <img
              src={`${product.imageUrl}`}
              alt=""
              className="product-image"
            />
          </div>

          <h2 className="card__title">
            {product.name}
          </h2>

          {product.discount ? (
            <div className="card__prices">
              <div className="prices prices--discount-price">
                {calculateDiscount(product.price, product.discount)}
              </div>

              <div className="prices prices--initial-price">
                {product.price}
              </div>
            </div>
          ) : (
            <div className="card__prices">
              <div className="prices prices--normal-price">
                {product.price}
              </div>
            </div>
          )}

          <div className="card__details details">
            <div className="details__option row">
              <p className="row__title">Screen</p>

              <div className="row__value">
                {product.screen}
              </div>
            </div>

            <div className="details__option row">
              <p className="row__title">Capacity</p>

              <div className="row__value">
                {product.capacity}
              </div>
            </div>

            <div className="details__option row">
              <p className="row__title">RAM</p>

              <div className="row__value">
                {product.ram}
              </div>
            </div>
          </div>

        </Link>

        <div className="card__buttons buttons">
          <button
            type="button"
            className="buttons__buy-button buy-button"
            onClick={handleBuyButton}
          >
            Add to card
          </button>

          <button
            type="button"
            className={classNames('buttons__buy-button favourites-button', {
              'favourites-button--is-favorite':
              tempFavorites.find(prod => prod.name === product.name),
            })}
            onClick={handleFavoriteClick}
          />
        </div>
      </div>
    </div>

  );
};
