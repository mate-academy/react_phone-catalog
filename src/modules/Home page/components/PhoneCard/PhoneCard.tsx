import React from 'react';
import './PhoneCard.scss';
import { ProductType } from '../../../../types/ProductType';
import { Link } from 'react-router-dom';

interface Props {
  product: ProductType;
  isHot?: boolean;
}

export const PhoneCard: React.FC<Props> = ({ product, isHot }) => {
  return (
    <article className="phone-card">
      <Link to={`/product/${product.category}/${product.itemId}`}>
        <div className="phone-card__container">
          <div className="phone-card__image-wrapper">
            <img
              src={product.image || product.images[0]}
              alt={product.itemId}
              className="phone-card__image"
            />
          </div>
          <h2 className="phone-card__title">{product.name}</h2>
          <p className="phone-card__price">
            ${product.price || product.priceDiscount}
            {isHot && (
              <span className="phone-card__price--hot">
                ${product.fullPrice || product.priceRegular}
              </span>
            )}
          </p>
          <div className="phone-card__specs">
            <div className="phone-card__spec">
              <span className="phone-card__spec-label">Screen</span>
              <span className="phone-card__spec-value">{product.screen}</span>
            </div>
            <div className="phone-card__spec">
              <span className="phone-card__spec-label">Capacity</span>
              <span className="phone-card__spec-value">{product.capacity}</span>
            </div>
            <div className="phone-card__spec">
              <span className="phone-card__spec-label">RAM</span>
              <span className="phone-card__spec-value">{product.ram}</span>
            </div>
          </div>
        </div>
        <div className="phone-card__buttons">
          <button className="phone-card__button">Add to cart</button>
          <button className="icon icon--favourites--button">
            <img src="nav/favourites.svg" alt="favourites" />
          </button>
        </div>
      </Link>
    </article>
  );
};
