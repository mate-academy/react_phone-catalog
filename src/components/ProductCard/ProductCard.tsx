import React, { useEffect, useState } from 'react';
import './ProductCard.scss';
import { Link } from 'react-router-dom';
import { Product } from '../../helpers/types/Product';
import { ShortDetails } from '../../helpers/types/ShortDetails';
import { getLocalStorageOrApi } from '../../helpers/utils/getLocalStorageOrApi';
import { DeviceDetails } from '../../helpers/types/DeviceDetails';
import { ProductButtons } from '../ProductButtons';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const [shortDetails, setShortDetails] = useState<ShortDetails>();

  const { price: foolPrice, discount, imageUrl, name, id } = product;

  const currentPrice = foolPrice - (foolPrice / 100) * discount;

  useEffect(() => {
    getLocalStorageOrApi<DeviceDetails>(id, `/products/${id}.json`).then(
      details => {
        const screen = parseFloat(details.display.screenSize);
        const { flash, ram } = details.storage;

        setShortDetails({ screen, flash, ram });
      },
    );
  }, []);

  return (
    <Link to={`/product/${id}`} className="product-card__link">
      <article className="product-card" data-cy="cardsContainer">
        <img src={imageUrl} alt={`${name} img`} className="product-card__img" />
        <h3 className="product-card__title">{name}</h3>
        <div className="product-card__prices">
          <h2 className="product-card__current-price">{`$${currentPrice}`}</h2>
          {!!discount && (
            <h2 className="product-card__fool-price">{`$${foolPrice}`}</h2>
          )}
        </div>

        {shortDetails && (
          <div className="product-card__characteristics">
            <h4 className="product-card__characteristics-name">Screen</h4>
            <span className="product-card__characteristics-value">
              {`${shortDetails.screen}"`}
            </span>
            <h4 className="product-card__characteristics-name">Capacity</h4>
            <span className="product-card__characteristics-value">
              {shortDetails.flash || '-'}
            </span>
            <h4 className="product-card__characteristics-name">RAM</h4>
            <span className="product-card__characteristics-value">
              {shortDetails.ram || '-'}
            </span>
          </div>
        )}

        <ProductButtons
          id={id}
          name={name}
          price={currentPrice}
          imageUrl={imageUrl}
        />
      </article>
    </Link>
  );
};
