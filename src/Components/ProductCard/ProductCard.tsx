import React from 'react';
import { Product } from '../../types/Product';
import { Link } from 'react-router-dom';
import { AddToCart } from '../AddToCart/AddToCart';
import { AddToFavorite } from '../AddToFavorite/AddToFavorite';

import './ProductCard.scss';

type Props = {
  slicedProducts: Product[];
};

export const ProductCard: React.FC<Props> = ({ slicedProducts }) => {
  return (
    <>
      {slicedProducts.map((product: Product) => {
        const options = {
          Screen: product.screen,
          Capacity: product.capacity,
          RAM: product.ram,
        };

        return (
          <div key={product.id} className="product-card">
            <div className="product-cart__block-up">
              <Link to={`/${product.category}/${product.itemId}`}>
                <img
                  className="product-card__img"
                  src={product.image}
                  alt={product.name}
                />
              </Link>

              <Link
                to={`/${product.category}/${product.itemId}`}
                className="product-card__product-name"
              >
                {product.name}
              </Link>
            </div>

            <div className="product-cart__block-down">
              <div className="product-card__price-box">
                <h3 className="product-card__price-box--price">{`$${product.price}`}</h3>

                <h3 className="product-card__price-box--full-price">{`$${product.fullPrice}`}</h3>
              </div>

              <div className="product-card__line" />

              {Object.entries(options).map(([key, value]) => (
                <div className="product-card__description" key={key}>
                  <p className="product-card__description--title">{key}</p>

                  <p className="product-card__description--value">{value}</p>
                </div>
              ))}

              <div className="product-card__button-block">
                <div className="product-card__button-cart">
                  <AddToCart product={product} />
                </div>

                <div className="product-card__button-favorite">
                  <AddToFavorite product={product} />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};
