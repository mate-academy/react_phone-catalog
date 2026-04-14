import React from 'react';
import { ProductForCard } from '../../types/ProductForCard';
import './ProductCard.scss';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';

type Props = {
  product: ProductForCard;
  discounted: boolean;
  cn?: string;
};

export const ProductCard: React.FC<Props> = ({ product, discounted, cn }) => {
  const {
    addToCart,
    removeFromCart,
    toggleFavorite,
    isFavorite,
    getProductById,
    isInCart,
  } = useProducts();

  const fullProduct = getProductById(product.itemId);
  const isFav = isFavorite(product.itemId);
  const inCart = isInCart(product.itemId);

  return (
    <Link
      to={`/${product.category}/${product.itemId}`}
      className={classNames(cn ? cn : 'product__card')}
      onClick={() => window.scrollTo(0, 0)}
    >
      <div className="product__card-image-wrapper">
        <img
          src={product.image}
          alt="product image"
          className="product__card-image"
        />
      </div>

      <div className="product__card-title body-text">{product.name}</div>

      <div className="product__card-price-wrapper">
        <h3 className="product__card-price">
          ${discounted ? product.price : product.fullPrice}
        </h3>
        {discounted && (
          <h3 className="product__card-price discounted">
            ${product.fullPrice}
          </h3>
        )}
      </div>

      <div className="product__card-line"></div>

      <ul className="product__card-description">
        <li className="product__card-item">
          <div className="product__card-param small-text">Screen</div>
          <div className="product__card-value">{product.screen}</div>
        </li>
        <li className="product__card-item">
          <div className="product__card-param small-text">Capacity</div>
          <div className="product__card-value">{product.capacity}</div>
        </li>
        <li className="product__card-item">
          <div className="product__card-param small-text">RAM</div>
          <div className="product__card-value">{product.ram}</div>
        </li>
      </ul>

      <div className="product__card-buttons">
        <button
          className={classNames(
            'product__card-button',
            inCart ? 'button' : 'primary-button',
          )}
          onClick={e => {
            e.preventDefault();

            if (inCart) {
              removeFromCart(product.itemId);
            } else if (fullProduct) {
              addToCart(fullProduct);
            }
          }}
        >
          {inCart ? 'Added' : 'Add to cart'}
        </button>

        <button
          className={classNames(
            'button button__favourite',
            isFav && 'button--active',
          )}
          onClick={e => {
            e.preventDefault();

            if (fullProduct) {
              toggleFavorite(fullProduct);
            }
          }}
        >
          <div
            className={classNames(
              'icon',
              isFav ? 'icon--favourite-filled' : 'icon--favourite',
            )}
          ></div>
        </button>
      </div>
    </Link>
  );
};
