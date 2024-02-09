/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import './ProductCard.scss';
import { Product } from '../../types/Product';
import { Buttons } from '../Buttons';

type Props = {
  product: Product;
};

// eslint-disable-next-line max-len
const imageLinkPart = 'https://mate-academy.github.io/react_phone-catalog/_new/';

export const ProductCard: React.FC<Props> = ({ product }) => {
  const [searchParams] = useSearchParams();
  const { productId } = useParams();
  const {
    itemId,
    name,
    price,
    fullPrice,
    screen,
    ram,
    capacity,
    image,
    category,
  } = product;

  const link = productId
    ? `../${itemId}`
    : `../${category}/${itemId}`;

  return (
    <li className="ProductCard" data-cy="cardsContainer">
      <Link
        className="ProductCard__link"
        to={`${link}`}
        state={{ search: searchParams.toString() }}
      >
        <div className="ProductCard__img-wrapper">
          <img
            className="ProductCard__img"
            src={`${imageLinkPart}/${image}`}
            alt=""
          />
        </div>

        <div className="ProductCard__top">
          <p className="ProductCard__name">
            {name}
          </p>

          <div className="ProductCard__price-wrapper">
            <h2 className="ProductCard__price">
              {price}
            </h2>
            <h2 className="ProductCard__price ProductCard__price--full">
              {fullPrice}
            </h2>
          </div>
        </div>

        <div className="ProductCard__devider" />

        <div className="ProductCard__info">
          <div className="ProductCard__info-item">
            <span className="ProductCard__info-name">
              Screen
            </span>
            <span
              className="
                ProductCard__info-name
                ProductCard__info-name--value
              "
            >
              {screen}
            </span>
          </div>

          <div className="ProductCard__info-item">
            <span className="ProductCard__info-name">
              Capacity
            </span>
            <span
              className="
                ProductCard__info-name
                ProductCard__info-name--value
              "
            >
              {capacity}
            </span>
          </div>

          <div className="ProductCard__info-item">
            <span className="ProductCard__info-name ProductCard__info-name">
              RAM
            </span>
            <span
              className="
                ProductCard__info-name
                ProductCard__info-name--value
              "
            >
              {ram}
            </span>
          </div>
        </div>
      </Link>

      <Buttons
        id={itemId}
        height="40px"
        width="40px"
      />
    </li>
  );
};
