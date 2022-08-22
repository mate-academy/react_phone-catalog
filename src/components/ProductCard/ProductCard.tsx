import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './ProductCard.scss';
import { Product } from '../../types/Product';

import { ProductsContext } from '../../helpers/ProductContext';

type Props = {
  product: Product,
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const { search } = useLocation();
  const {
    addToLocalStorage,
    removeFromLocalStorage,
    getLocalStorageArray,
  } = useContext(ProductsContext);
  const [addedToCart, setAddedToCart] = useState<boolean>();
  const [addedToFavorites, setAddedToFavorites] = useState<boolean>();

  const itemInLocaleStorage = (key: string) => {
    const array: Product[] = getLocalStorageArray(key);

    return array.find(item => item.id === product.id);
  };

  return (
    <>
      <div className="product" key={product.id}>
        <div className="product-card">
          <Link
            to={{
              pathname: `/product/${product.id}`,
              search,
            }}
          >
            <div className="product-image">
              <img
                className="image"
                src={product.imageUrl}
                alt={product.name}
              />
            </div>
          </Link>
          <Link
            to={{
              pathname: `/product/${product.id}`,
              search,
            }}
          >
            <div className="product-content-title">
              <p className="product-name-title">
                {product.name.replaceAll('™', '')}
              </p>
              <div className="product-price-title">
                {product.discount !== 0
                  && (
                    <p className="price">{`$${Math.round(product.price - (product.price / product.discount))}`}</p>
                  )}
                <p className={(product.discount
                  ? 'has-discount'
                  : 'price')}
                >
                  {`$${product.price}`}
                </p>
              </div>
            </div>
          </Link>
          <div className="product-content-info">
            <div className="product-info">
              <p className="product-value">Screen</p>
              <p className="product-description">
                {product.screen || 'No data'}
              </p>
            </div>
            <div className="product-info">
              <p className="product-value">Capacity</p>
              <p className="product-description">
                {product.capacity || 'No data'}
              </p>
            </div>
            <div className="product-info">
              <p className="product-value">RAM</p>
              <p
                className="product-description"
              >
                {product.ram || 'No data'}
              </p>
            </div>
          </div>
          <div className="product-footer">
            {!itemInLocaleStorage('cart') && !addedToCart
              ? (
                <button
                  type="button"
                  className="product-button-add"
                  onClick={() => {
                    addToLocalStorage('cart', product);
                    setAddedToCart(true);
                  }}
                >
                  Add to cart
                </button>
              )
              : (
                <button
                  type="button"
                  className="product-button-add added"
                  onClick={() => {
                    removeFromLocalStorage('cart', product);
                    setAddedToCart(false);
                  }}
                >
                  Added to cart
                </button>
              )}
            {!itemInLocaleStorage('favorites') && !addedToFavorites
              ? (
                <button
                  type="button"
                  className="product-button-favorites"
                  data-cy="addToFavorite"
                  onClick={() => {
                    addToLocalStorage('favorites', product);
                    setAddedToFavorites(true);
                  }}
                >
                  <i className="fa-regular fa-heart" />
                </button>
              )
              : (
                <button
                  type="button"
                  className="product-button-favorites added"
                  data-cy="addToFavorite"
                  onClick={() => {
                    removeFromLocalStorage('favorites', product);
                    setAddedToFavorites(false);
                  }}
                >
                  <i className="fa-solid fa-heart red-color" />
                </button>
              )}
          </div>
        </div>
      </div>
    </>
  );
};
