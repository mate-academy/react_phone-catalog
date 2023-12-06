import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import './ProductCard.scss';
import { Product } from '../../helpers/types/Product';
import { getDiscountedPrice } from '../../helpers/utils/getDiscount';
import { capitalize } from '../../helpers/utils/stringHelpers';
import { ProductAdd } from '../ProductAdd';

type Props = {
  product: Product,
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const {
    id,
    imageUrl,
    name,
    price,
    discount,
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
        to={`/product/${id}`}
        className="ProductCard__content"
      >
        <img
          src={imageUrl}
          alt={name}
          className="ProductCard__image"
        />

        <p className="ProductCard__name">
          {name}
        </p>

        <div className="ProductCard__prices">
          {!!discount && (
            <p className="ProductCard__price">
              {`$${getDiscountedPrice(product)}`}
            </p>
          )}
          <p
            className={classNames('ProductCard__price', {
              'ProductCard__price--discount': !!discount,
            })}
          >
            {`$${price}`}
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
