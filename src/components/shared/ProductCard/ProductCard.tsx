import React from 'react';
import './ProductCard.scss';
import { Product } from '../../../types/Product';
import { Link } from 'react-router-dom';
import { ButtonFavoriteCart } from '../ButtonFavoriteCart';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const isLowerPrice = product.fullPrice !== product.price;

  return (
    <Link
      to={`/${product.category}/${product.itemId}`}
      className="product-card"
    >
      <div className="product-card__container">
        <div className="product-card__image-box">
          <img
            className="product-card__image"
            src={product.image}
            alt={'Image of ' + product.name}
          />
        </div>
        <h3 className="product-card__title">{product.name}</h3>

        <div className="product-card__prices">
          <p className="product-card__price-actual">{'$' + product.price}</p>
          {isLowerPrice && (
            <p className="product-card__price-full">
              {'$' + product.fullPrice}
            </p>
          )}
        </div>

        <div className="product-card__divider"></div>

        <ul className="product-card__about">
          <li className="product-card__about-container">
            <p className="product-card__about-title">Screen</p>
            <p className="product-card__about-text">{product.screen}</p>
          </li>
          <li className="product-card__about-container">
            <p className="product-card__about-title">
              {product.category === 'accessories' ? 'Size' : 'Capacity'}
            </p>
            <p className="product-card__about-text">{product.capacity}</p>
          </li>
          <li className="product-card__about-container">
            <p className="product-card__about-title">RAM</p>
            <p className="product-card__about-text">{product.ram}</p>
          </li>
        </ul>

        <ButtonFavoriteCart productId={product.itemId} />
      </div>
    </Link>
  );
};
