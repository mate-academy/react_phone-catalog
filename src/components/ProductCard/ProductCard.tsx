import './ProductCard.scss';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { Product } from '../../types/Product';
import { ButtonHeart } from '../ButtonHeart/ButtonHeart';
import { PriceContext } from '../../storage/fullPriceContext';
import { AddToCartButton } from '../AddToCartButton';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const {
    name,
    fullPrice,
    price,
    image,
    capacity,
    ram,
    screen,
    itemId,
    id,
  } = product;
  const onlyFullPrice = useContext(PriceContext) || false;

  return (
    <li
      className="product-card"
      key={id}
    >
      <div
        className="product-card__img-container"
      >
        <Link
          to={`/${product.category}/${product.itemId}`}
        >
          <img
            src={image}
            alt={name}
            className="product-card__img"
          />
        </Link>
      </div>

      <div className="product-card__detail">
        <Link
          to={itemId}
        >
          <p className="product-card__name">
            {name}
          </p>
        </Link>

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
          <AddToCartButton
            product={product}
          />

          <ButtonHeart
            product={product}
          />
        </div>

      </div>
    </li>
  );
};
