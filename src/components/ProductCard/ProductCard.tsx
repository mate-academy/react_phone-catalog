/* eslint-disable react/jsx-no-duplicate-props */
import { Link } from 'react-router-dom';
import { Product } from '../../types/Product';
import './ProductCard.scss';
import '../../styles/utils/typography.scss';
import { BASE_URL } from '../../utils/const';
import { ActionButtons } from '../ActionButtons';
import React from 'react';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  return (
    <div className="product-card">
      <Link
        to={`/${product.category}/${product.itemId}`}
        className="product-card__image-container"
      >
        <img
          className="product-card__image"
          src={`${BASE_URL}/${product.image}`}
          alt={product.name}
        />
      </Link>

      <Link
        to={`/${product.category}/${product.itemId}`}
        className="product-card__name-container"
      >
        <p className="product-card__name paragraph">{`${product.name} (iMT9G2FS/A)`}</p>
      </Link>

      <div className="product-card__price-container">
        <h3 className="product-card__price title title--h3">
          ${product.price}
        </h3>
        <p className="product-card__fullprice">${product.fullPrice}</p>
      </div>

      <div className="product-card__information">
        <div className="product-card__charact-container">
          <p className="product-card__charact small-text">Screen</p>
          <p className="product-card__data">{product.screen}</p>
        </div>

        <div className="product-card__charact-container">
          <p className="product-card__charact small-text">Capacity</p>
          <p className="product-card__data">{product.capacity}</p>
        </div>

        <div className="product-card__charact-container">
          <p className="product-card__charact small-text">RAM</p>
          <p className="product-card__data">{product.ram}</p>
        </div>
      </div>

      <ActionButtons productId={product.itemId} />
    </div>
  );
};
