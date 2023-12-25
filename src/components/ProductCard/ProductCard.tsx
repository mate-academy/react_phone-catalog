import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.scss';
import classNames from 'classnames';
import { StateStore } from '../../store/StoreContext';
import { ICONS } from '../../images/icons/icons';
import { UpgradedProduct } from '../../types/UpgradedProduct';

type Props = {
  product: UpgradedProduct;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const { handleAction } = useContext(StateStore);

  const {
    addedToFavourites,
    addedToCart,
    category,
    phoneId,
    name,
    fullPrice,
    price,
    screen,
    capacity,
    ram,
    image,
  } = product;

  const onFavouritesClick = () => {
    handleAction(product, 'favourites');
  };

  const onCartClick = () => {
    handleAction(product, 'cart');
  };

  return (
    <div className="productCard" data-cy="cardsContainer">
      <Link to={`/${category}/${phoneId}`} className="productCard__link">
        <img
          src={`https://mate-academy.github.io/react_phone-catalog/_new/${image}`}
          alt="Product card"
          className="productCard__link--image"
        />
        <p className="productCard__link--title">{name}</p>
      </Link>

      <div className="productCard__price">
        <h2 className="productCard__price--discount">{`$${price}`}</h2>
        <h2 className="productCard__price--full">{`$${fullPrice}`}</h2>
      </div>

      <div className="productCard__line" />

      <div className="productCard__description">
        <div className="productCard__description--block">
          <p
            className="smallText productCard__description--name"
          >
            Screen
          </p>
          <p
            className="smallText productCard__description--value"
          >
            {screen}
          </p>
        </div>
        <div className="productCard__description--block">
          <p
            className="smallText productCard__description--name"
          >
            Capacity
          </p>
          <p
            className="smallText productCard__description--value"
          >
            {capacity}
          </p>
        </div>
        <div className="productCard__description--block">
          <p
            className="smallText productCard__description--name"
          >
            RAM
          </p>
          <p
            className="smallText productCard__description--value"
          >
            {ram}
          </p>
        </div>
      </div>

      <div className="productCard__buttons">
        <button
          type="button"
          className={classNames('button productCard__buttons--cart', {
            'productCard__buttons--cart--active': addedToCart,
          })}
          onClick={onCartClick}
        >
          {
            addedToCart
              ? (
                'Added to cart'

              ) : (
                'Add to cart'
              )
          }
        </button>
        <button
          data-cy="addToFavorite"
          type="button"
          className={classNames('button productCard__buttons--favourite', {
            'productCard__buttons--favourite--active': addedToFavourites,
          })}
          onClick={onFavouritesClick}
        >
          <img
            src={
              addedToFavourites
                ? ICONS.favouritesSelected
                : ICONS.favourites
            }
            alt="Favourites"
            className="productCard__buttons--icon"
          />
        </button>
      </div>
    </div>
  );
};
