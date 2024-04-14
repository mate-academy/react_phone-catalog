import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import './ProductCard.scss';
import { UpgratedProduct } from '../../types/UpgratedProduct';
import { ProductState } from '../../store/storeContext';
import { ICONS } from '../../images/icons/Icons';

type Props = {
  product: UpgratedProduct;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const { handleAction } = useContext(ProductState);
  const {
    addedToFavourites,
    addedToCart,
    category,
    itemId,
    name,
    fullPrice,
    price,
    screen,
    capacity,
    ram,
    image,
  } = product;

  const handleFavouriteClick = () => {
    handleAction(product, 'favourites');
  };

  const handleAddToCardClick = () => {
    handleAction(product, 'cart');
  };

  return (
    <div className="productCard" data-cy="cardsContainer">
      <Link to={`/${category}/${itemId}`} className="productCard__link">
        <img
          src={image}
          alt="Product Card"
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
          <p className="smallText productCard__description--name">Screen</p>
          <p className="smallText productCard__description--value">{screen}</p>
        </div>

        <div className="productCard__description--block">
          <p className="smallText productCard__description--name">Capacity</p>
          <p className="smallText productCard__description--value">
            {capacity}
          </p>
        </div>

        <div className="productCard__description--block">
          <p className="smallText productCard__description--name">RAM</p>
          <p className="smallText productCard__description--value">{ram}</p>
        </div>
      </div>

      <div className="productCard__buttons">
        <button
          type="button"
          className={cn('productCard__buttons--cart', {
            'productCard__buttons--cart--active': addedToCart,
          })}
          onClick={handleAddToCardClick}
        >
          {addedToCart ? 'Added to cart' : 'Add to cart'}
        </button>

        <button
          type="button"
          className={cn('productCard__buttons--favourite', {
            'productCard__buttons--favourite--active': addedToCart,
          })}
          onClick={handleFavouriteClick}
        >
          <img
            src={addedToFavourites ? ICONS.favouriteFilled : ICONS.favourite}
            alt="Favourites"
            className="productCard__buttons--icon"
          />
        </button>
      </div>
    </div>
  );
};
