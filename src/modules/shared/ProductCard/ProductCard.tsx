import './ProductCard.scss';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Product } from '../../../types/Product';
import { GlobalContext } from '../../../store/GlobalContext';
import { Icon } from '../Icon';
import { iconsObject } from '../../../constants/iconsObject';

type Props = {
  product: Product;
  displayType: 'fullPrice' | 'with-discount';
};

export const ProductCard: React.FC<Props> = ({ product, displayType }) => {
  const { cart, favorites, toggleFavorites, addToCart, theme } =
    useContext(GlobalContext);

  const isInCart = cart.some(item => item.id === product.itemId);
  const isFavorites = favorites.some(item => item.itemId === product.itemId);

  return (
    <div className="productCard">
      <Link
        className="productCard__activeClick"
        to={`/${product.category}/${product.itemId}`}
      >
        <div className="productCard__container-photo">
          <img
            src={product.image}
            alt="Product's photo"
            className="productCard__photo"
          />
        </div>
      </Link>

      <div className="productCard__container-title">
        <span className="productCard__title">{product.name}</span>
      </div>

      <div className="productCard__container-price">
        {displayType === 'fullPrice' && (
          <span className="productCard__price-regular-without-discount">
            {`$${product.fullPrice}`}
          </span>
        )}

        {displayType === 'with-discount' && (
          <>
            <span className="productCard__price-discount">
              {`$${product.price}`}
            </span>
            <span className="productCard__price-regular">
              {`$${product.fullPrice}`}
            </span>
          </>
        )}
      </div>

      <div className="productCard__divider"></div>

      <div className="productCard__container-specifications">
        <div className="productCard__block">
          <span className="productCard__info">Screen</span>
          <span className="productCard__value">{product.screen}</span>
        </div>
        <div className="productCard__block">
          <span className="productCard__info">Capacity</span>
          <span className="productCard__value">{product.capacity}</span>
        </div>
        <div className="productCard__block">
          <span className="productCard__info">RAM</span>
          <span className="productCard__value">{product.ram}</span>
        </div>
      </div>

      <div className="productCard__container-buttons">
        <button
          className={classNames(
            'productCard__button',
            'productCard__button-card',
            { 'productCard__button-card--active': isInCart },
          )}
          onClick={() => addToCart(product)}
        >
          {isInCart ? `Added` : `Add to cart`}
        </button>
        <button
          className={classNames(
            'productCard__button',
            'productCard__button-favorites',
            { 'productCard__button-favorites--active': isFavorites },
          )}
          onClick={() => toggleFavorites(product)}
        >
          {isFavorites ? (
            <Icon icon={iconsObject.favorites__filled} />
          ) : theme === 'light' ? (
            <Icon icon={iconsObject.favorites} />
          ) : (
            <Icon icon={iconsObject.favorites_dark} />
          )}
        </button>
      </div>
    </div>
  );
};
