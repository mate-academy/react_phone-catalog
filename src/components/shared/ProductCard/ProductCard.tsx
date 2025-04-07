import './ProductCard.scss';

import React, { useContext } from 'react';
import classNames from 'classnames';
import { LocalStorageContext } from '../../../app/Contexts/LocalStorageContext';

import { Product } from '../../../types/Product';

import favIconFilled from '../../../../public/icons/favourites-filled.svg';
import favIcon from '../../../../public/icons/favourites.svg';

type ProductCardProps = {
  product: Product;
  slider?: boolean;
};

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  slider,
}) => {
  const { id, name, fullPrice, price, screen, capacity, ram, image } = product;

  const { cartItems, favItems, updateFavList, updateCart } =
    useContext(LocalStorageContext);

  const isFav = favItems.some(item => item.id === id);
  const isInCart = cartItems.some(item => item.id === id);

  return (
    <div
      className={classNames('product product-card', {
        'product product-card--slider': slider,
      })}
    >
      <img className="product__design" src={image} alt={`${name} design`} />

      <p className="product__name">{`${name}(iMT9G2FS/A)`}</p>

      <div className="price product__price">
        <p className="price--regular">{`$${fullPrice}`}</p>

        {price && <p className="price--discount">{`$${price}`}</p>}
      </div>

      <div className="details product__details">
        <div className="details__wrap">
          <p className="details__title">Screen</p>
          <p className="details__info">{screen}</p>
        </div>

        <div className="details__wrap">
          <p className="details__title">Capacity</p>
          <p className="details__info">{capacity}</p>
        </div>

        <div className="details__wrap">
          <p className="details__title">RAM</p>
          <p className="details__info">{ram}</p>
        </div>
      </div>

      <div className="buttons product-card__buttons">
        <button
          type="button"
          onClick={() => updateCart(product)}
          className={classNames(
            'buttons__add-to-cart',
            { selected: isInCart },
            { 'buttons__add-to-cart--slider': slider },
          )}
        >
          {isInCart ? 'Added to cart' : 'Add to cart'}
        </button>

        <div
          onClick={() => updateFavList(product)}
          className="buttons__add-to-fav"
        >
          <img
            className="fav-icon"
            src={isFav ? favIconFilled : favIcon}
            alt="add / delete favorite"
          />
        </div>
      </div>
    </div>
  );
};
