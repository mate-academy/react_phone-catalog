import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import './ProductCard.scss';
import { Product } from '../../helpers/types/Product';
import { capitalize } from '../../helpers/utils/capitalize';
import { hasDiscount } from '../../helpers/utils/getDiscount';
import { ProductAdd } from '../ProductAdd';

type Props = {
  product: Product,
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const {
    phoneId,
    image,
    name,
    price,
    fullPrice,
    screen,
    capacity,
    ram,
  } = product;

  const productFields = {
    screen,
    capacity,
    ram,
  };

  return (
    <div className="ProductCard" data-cy="cardsContainer">
      <Link
        to={`/product/${phoneId}`}
        className="ProductCard__content"
      >
        <img
          src={image}
          alt={name}
          className="ProductCard__image"
        />

        <p className="ProductCard__name">
          {name}
        </p>

        <div className="ProductCard__prices">
          {hasDiscount(product) && (
            <p className="ProductCard__price">
              {`$${price}`}
            </p>
          )}
          <p
            className={classNames('ProductCard__price', {
              'ProductCard__price--discount': hasDiscount(product),
            })}
          >
            {`$${fullPrice}`}
          </p>
        </div>

        <div className="ProductCard__divider" />

        <div className="ProductCard__info">
          {Object.entries(productFields).map(([key, value]) => (
            <div key={key} className="ProductCard__field">
              <p className="ProductCard__field-key">{capitalize(key)}</p>
              <p className="ProductCard__field-value">
                {value || '-'}
              </p>
            </div>
          ))}
        </div>
      </Link>

      <ProductAdd product={product} />
    </div>
  );
};
