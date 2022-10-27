/* eslint-disable no-console */
import classNames from 'classnames';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types/Product';
import './ProductCard.scss';
import '../../scss/blocks/addToCartButtons.scss';
import '../../scss/blocks/productParameters.scss';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const {
    name, price, screen, capacity, ram, discount,
  } = product;
  const [isSelected, setIsSelected] = useState(false);
  const [isaddedToCard, setIsAddedToCard] = useState(false);

  const getMemoryValue = (value: string) => {
    if (!value) {
      return 'N/A';
    }

    const num = parseInt(value.replace(/[^\d]/g, ''), 10);

    if (num / 1000 >= 1) {
      return `${Math.floor(num / 1000)}GB`;
    }

    return value;
  };

  const productType = () => {
    if (product.type === 'accessory') {
      return 'accessories';
    }

    return `${product.type}s`;
  };

  return (
    <div
      data-cy="cardsContainer"
      className="ProductCard"
    >
      <Link
        className="ProductCard__top"
        to={`/${productType()}/${product.id}`}
      >
        <div className="ProductCard__imgContainer">
          <img
            src={`https://mate-academy.github.io/react_phone-catalog/${product.imageUrl}`}
            alt={product.id}
            className="ProductCard__img"
          />
        </div>
        <p className="ProductCard__title">
          {name}
        </p>
      </Link>
      <div className="ProductCard__bottom">
        <p className="ProductCard__price">
          <span className="ProductCard__withDiscount">{`$${price}`}</span>
          {!!discount && (
            <span className="ProductCard__noDiscount">{`$${Math.floor(price * ((100 + discount) / 100))}`}</span>
          )}
        </p>
        <div className="ProductCard__line"> </div>
        <div className="productParameters ProductCard__parameters">
          <div className="productParameters__parameter">
            <span className="productParameters__character">Screen</span>
            <span className="productParameters__value">
              {screen.replace(/ inches/, '"')}
            </span>
          </div>
          <div className="productParameters__parameter">
            <span className="productParameters__character">Capacity</span>
            <span className="productParameters__value">
              {getMemoryValue(capacity)}
            </span>
          </div>
          <div className="productParameters__parameter">
            <span className="productParameters__character">RAM</span>
            <span className="productParameters__value">
              {getMemoryValue(ram)}
            </span>
          </div>
        </div>
        <div className="addToCartButtons">
          <button
            type="button"
            className={classNames(
              'addToCartButtons__buy',
              { 'addToCartButtons__buy--added': isaddedToCard },
            )}
            onClick={() => setIsAddedToCard(state => !state)}
          >
            {`${!isaddedToCard ? 'Add' : 'Added'} to cart`}
          </button>
          <button
            type="button"
            className={classNames(
              'addToCartButtons__like',
              'button',
              { 'addToCartButtons__like--selected': isSelected },
            )}
            onClick={() => setIsSelected(state => !state)}
          >
            &nbsp;
          </button>
        </div>
      </div>
    </div>
  );
};
