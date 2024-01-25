import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.scss';
import { Product } from '../../types/Product';
import { ButtonFavorites } from '../ButtonFavorites';
import { ButtonAddCard } from '../ButtonAddCard';

interface Props {
  product: Product,
}

const BASE_URL = 'https://mate-academy.github.io/react_phone-catalog/_new/';

export const ProductCard: React.FC<Props> = ({ product }) => {
  const {
    phoneId,
    name,
    price,
    fullPrice,
    screen,
    capacity,
    ram,
    image,
  } = product;

  return (
    <Link
      to={`/${product.category}/${phoneId}`}
      className="productCard"
      data-cy="cardsContainer"
    >
      <div className="productCard__photo">
        <img src={`${BASE_URL}${image}`} alt="product" className="productCard__img" />
      </div>

      <div className="productCard__title">
        <h4 className="productCard__title--text">
          {name}
        </h4>
      </div>
      <div className="productCard__price">
        <span className="productCard__price--current">
          {`$${price}`}
        </span>
        <span className="productCard__price--full">
          {`$${fullPrice}`}
        </span>
      </div>
      <div className="productCard__info">
        <div className="productCard__info--wrapper">
          <span className="productCard__info--title">
            Screen
          </span>
          <span className="productCard__info--description">
            {screen}
          </span>
        </div>
        <div className="productCard__info--wrapper">
          <span className="productCard__info--title">
            Capacity
          </span>
          <span className="productCard__info--description">
            {capacity}
          </span>
        </div>
        <div className="productCard__info--wrapper">
          <span className="productCard__info--title">
            RAM
          </span>
          <span className="productCard__info--description">
            {ram}
          </span>
        </div>
      </div>
      <div className="productCard__buttons">
        <ButtonAddCard product={product} />
        <ButtonFavorites product={product} />
      </div>
    </Link>
  );
};
