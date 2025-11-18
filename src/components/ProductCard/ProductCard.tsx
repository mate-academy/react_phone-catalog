import './ProductCard.scss';
import favourites from '../../images/icons/favourites-heart-like.png';
import { Device } from '../../types/Device';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';

type Props = {
  model: Device;
};

export const ProductCard: React.FC<Props> = ({ model }) => {
  const { pathname } = useLocation();
  const pathParts = pathname.split('/').filter(Boolean);
  const basePath = pathParts[0] || 'home';
  const productId = pathParts[1];

  return (
    <div
      className={classNames('product-card', {
        [`product-card--${basePath}`]: basePath !== 'home' && !productId,
        'product-card--item': productId,
      })}
      key={model.id}
    >
      <div className="product-card__photo">
        <Link to={`/${model.category}/${model.id}`}>
          <img
            src={
              model.images[0].startsWith('/')
                ? model.images[0]
                : `/${model.images[0]}`
            }
            className="product-card__photo__image"
          />
        </Link>
      </div>

      <div className="product-card__title">{model.name}</div>

      <div className="product-card__price">
        <div className="product-card__price__price-discount">
          {`$${model.priceDiscount}`}
        </div>

        <div className="product-card__price__price-regular">
          {`$${model.priceRegular}`}
        </div>
      </div>

      <div className="product-card__line"></div>

      <div className="product-card__characteristics">
        <div className="product-card__characteristics__container">
          <div className="product-card__characteristics__name">Screen</div>

          <div className="product-card__characteristics__info">
            {model.screen}
          </div>
        </div>

        <div className="product-card__characteristics__container">
          <div className="product-card__characteristics__name">Capacity</div>

          <div className="product-card__characteristics__info">
            {model.capacity.replace('GB', ' GB')}
          </div>
        </div>

        <div className="product-card__characteristics__container">
          <div className="product-card__characteristics__name">RAM</div>

          <div className="product-card__characteristics__info">
            {model.ram.replace('GB', ' GB')}
          </div>
        </div>
      </div>

      <div className="product-card__buttons">
        <div className="product-card__buttons__add-to-cart">Add to cart</div>

        <div className="product-card__buttons__add-to-favourites">
          <img
            src={favourites}
            alt="heart"
            className="button-add-to-favourites__image"
          />
        </div>
      </div>
    </div>
  );
};
