import React from 'react';
import { Link } from 'react-router-dom';
import { ProductDetails } from '../../types/ProductDetails';
import { useTranslation } from 'react-i18next';

type Props = {
  product: ProductDetails;
};

export const ProductsSliderCard: React.FC<Props> = ({ product }) => {
  const { t } = useTranslation();

  return (
    <div className="products-slider-card">
      <Link to={`/${product.category}/${product.id}`}>
        <img
          src={product.images[0]}
          alt={product.name}
          className="products-slider-card__image"
        />
      </Link>

      <Link
        to={`/${product.category}/${product.id}`}
        className="products-slider-card__title"
      >
        {product.name}
      </Link>

      {product.priceDiscount !== product.priceRegular ? (
        <div className="products-slider-card-prices">
          <strong className="products-slider-card-price">
            ${product.priceDiscount}
          </strong>
          <p className="products-slider-card-fullprice">
            ${product.priceRegular}
          </p>
        </div>
      ) : (
        <div className="products-slider-card-prices">
          <strong className="products-slider-card-price">
            ${product.priceRegular}
          </strong>
        </div>
      )}

      <div className="products-slider-card-details">
        <div className="products-slider-card-details-option">
          <p className="products-slider-card-details-option-title">
            {t('screen')}
          </p>
          <p className="products-slider-card-details-option-value">
            {product.screen}
          </p>
        </div>

        <div className="products-slider-card-details-option">
          <p className="products-slider-card-details-option-title">
            {t('capacity')}
          </p>
          <p className="products-slider-card-details-option-value">
            {product.capacity}
          </p>
        </div>

        <div className="products-slider-card-details-option">
          <p className="products-slider-card-details-option-title">
            {t('RAM')}
          </p>
          <p className="products-slider-card-details-option-value">
            {product.ram}
          </p>
        </div>
      </div>

      <div className="products-slider-card-buttons">
        <button className="products-slider-card-buttons-cart">
          {t('to-cart')}
        </button>
        <button className="products-slider-card-buttons-fav" />
      </div>
    </div>
  );
};
