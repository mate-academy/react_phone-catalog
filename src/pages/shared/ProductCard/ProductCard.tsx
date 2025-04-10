import './ProductCard.scss';
import React, { FC, memo, useContext, useMemo } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Product } from '../../../types/Product';
import { GlobalContext } from '../../../context/GlobalContext';
import { Icon } from '../Icon';
import { icons } from '../../../constants/iconsObject';

type Props = {
  product: Product;
  displayType: 'fullPrice' | 'with-discount';
};

export const ProductCard: FC<Props> = memo(({ product, displayType }) => {
  const { cart, favorites, toggleFavorites, addToCart, theme } =
    useContext(GlobalContext);

  const isInCart = useMemo(
    () => cart.some(({ id }) => id === product.itemId),
    [cart, product.itemId],
  );
  const isFavorites = useMemo(
    () => favorites.some(({ itemId }) => itemId === product.itemId),
    [favorites, product.itemId],
  );

  return (
    <div className="productCard">
      <Link
        className="productCard__container"
        to={`/${product.category}/${product.itemId}`}
      >
        <div className="productCard__container-photo">
          <img
            src={product.image}
            alt="Product's photo"
            className="productCard__photo"
          />
        </div>

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
            onClick={(
              event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
            ) => {
              event.preventDefault();
              addToCart(product);
            }}
          >
            {isInCart ? `Added` : `Add to cart`}
          </button>
          <button
            className={classNames(
              'productCard__button',
              'productCard__button-favorites',
              { 'productCard__button-favorites--active': isFavorites },
            )}
            onClick={(
              event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
            ) => {
              event.preventDefault();
              toggleFavorites(product);
            }}
          >
            {isFavorites ? (
              <Icon icon={icons.favorites__filled[theme]} />
            ) : (
              <Icon icon={icons.favorites[theme]} />
            )}
          </button>
        </div>
      </Link>
    </div>
  );
});

ProductCard.displayName = 'ProductCard';
