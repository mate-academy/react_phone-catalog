/* eslint-disable max-len */
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { ProductType } from '../../types/Product';
import { Context } from '../context';
import { ButtonAddToCart } from '../Blocs/button_add_to_cart';
import { ButtonAddToFavorite } from '../Blocs/button_add_to_favorite';

type Props = {
  product: ProductType
};

export const Card: React.FC<Props> = ({ product }) => {
  const { setActiveProduct } = useContext(Context);

  const {
    id,
    imageUrl,
    name,
    price,
    ram,
    capacity,
    screen,
    discount,
  } = product;

  return (
    <div className="card">
      <Link
        to={`/${product.type}s/${product.id}`}
        onClick={() => {
          setActiveProduct(product);
        }}
        className="card__img"
      >
        <img
          src={imageUrl}
          alt={id}
          className="card__img"
        />
      </Link>
      <h4 className="card__name">
        {name}
      </h4>
      <div className="card__priсes">
        <h2 className="card__priсe">
          $
          {product.price - (price / 100)
          * discount}
        </h2>
        {discount > 0 && (
          <h2 className="
          card__priсe
          card__priсe--discount
          "
          >
            $
            {product.price}
          </h2>
        )}
      </div>
      <div className="card__line" />
      <div className="card__characteristics">
        <p className="card__characteristic_name">Screen</p>
        <p className="card__characteristic">{screen}</p>
        <p className="card__characteristic_name">Capacity</p>
        <p className="card__characteristic">{capacity}</p>
        <p className="card__characteristic_name">RAM</p>
        <p className="card__characteristic">{ram}</p>
      </div>
      <div className="card__buttons">
        <ButtonAddToCart product={product} />

        <ButtonAddToFavorite product={product} />
      </div>
    </div>
  );
};
