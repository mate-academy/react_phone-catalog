import './ProductCard.scss';
import { useContext } from 'react';
import { Product } from '../../types/Product';
import { ButtonHeart } from '../ButtonHeart/ButtonHeart';
import { PriceContext } from '../../storage/fullPriceContext';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const {
    name, fullPrice, price, image, capacity, ram, screen,
  } = product;
  const onlyFullPrice = useContext(PriceContext) || false;

  return (
    <li className="product-card">
      <div className="product-card__img-container">
        <img
          src={`./_new/${image}`}
          alt={name}
          className="product-card__img"
        />
      </div>

      <div className="product-card__detail">
        <p
          className="product-card__name"
        >
          {name}
        </p>

        <div className="product-card__prices">
          <div className="product-card__price product-card__price--sale">
            {onlyFullPrice ? `$${fullPrice}` : `$${price}`}
          </div>

          {!onlyFullPrice && (
            <div className="product-card__price product-card__price--full">
              {`$${fullPrice}`}
            </div>
          )}
        </div>

        <div className="product-card__info-block">
          <div className="product-card__info">
            <div className="product-card__info-title">
              Screen
            </div>
            <div className="product-card__info-text">
              {screen}
            </div>
          </div>

          <div className="product-card__info">
            <div className="product-card__info-title">
              Capacity
            </div>
            <div className="product-card__info-text">
              {capacity}
            </div>
          </div>

          <div className="product-card__info">
            <div className="product-card__info-title">
              RAM
            </div>
            <div className="product-card__info-text">
              {ram}
            </div>
          </div>
        </div>

        <div className="product-card__buttons">
          <button
            className="product-card__button"
            type="button"
          >
            Add to cart
          </button>

          <ButtonHeart
            product={product}
          />
        </div>

      </div>
    </li>
  );
};
