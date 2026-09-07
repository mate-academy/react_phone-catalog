import React, { FC, memo, useContext, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { GlobalContext } from '../../../context/GlobalContext';
import { Icon } from '../Icon';
import { icons } from '../../../constants/icons.config';
import { Props } from './types/types';
import { Specification } from './components/Specification';
import { PriceDisplay } from './components/PriceDisplay';
import './ProductCard.scss';

export const ProductCard: FC<Props> = memo(({ product, displayType }) => {
  const { cart, favorites, toggleFavorites, addToCart, theme } =
    useContext(GlobalContext);

  const isInCart = useMemo(
    () => cart.some(item => item.id === product.itemId),
    [cart, product.itemId],
  );

  const isFavorite = useMemo(
    () => favorites.some(item => item.itemId === product.itemId),
    [favorites, product.itemId],
  );

  const handleAddToCart = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      addToCart(product);
    },
    [addToCart, product],
  );

  const handleToggleFavorite = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      toggleFavorites(product);
    },
    [toggleFavorites, product],
  );

  const favoriteIcon = isFavorite
    ? icons.favorites__filled[theme]
    : icons.favorites[theme];

  const specifications = [
    { label: 'Screen', value: product.screen },
    { label: 'Capacity', value: product.capacity },
    { label: 'RAM', value: product.ram },
  ];

  return (
    <div className="productCard">
      <Link
        className="productCard__container"
        to={`/${product.category}/${product.itemId}`}
      >
        <div className="productCard__container-photo">
          <img
            src={product.image}
            alt={`${product.name} product image`}
            className="productCard__photo"
          />
        </div>

        <div className="productCard__container-title">
          <span className="productCard__title">{product.name}</span>
        </div>

        <PriceDisplay product={product} displayType={displayType} />

        <div className="productCard__divider" />

        <div className="productCard__container-specifications">
          {specifications.map(spec => (
            <Specification
              key={spec.label}
              label={spec.label}
              value={spec.value}
            />
          ))}
        </div>

        <div className="productCard__container-buttons">
          <button
            className={classNames(
              'productCard__button',
              'productCard__button-card',
              { 'productCard__button-card--active': isInCart },
            )}
            onClick={handleAddToCart}
            aria-label={isInCart ? 'Remove from cart' : 'Add to cart'}
          >
            {isInCart ? 'Added' : 'Add to cart'}
          </button>

          <button
            className={classNames(
              'productCard__button',
              'productCard__button-favorites',
              { 'productCard__button-favorites--active': isFavorite },
            )}
            onClick={handleToggleFavorite}
            aria-label={
              isFavorite ? 'Remove from favorites' : 'Add to favorites'
            }
          >
            <Icon icon={favoriteIcon} />
          </button>
        </div>
      </Link>
    </div>
  );
});

ProductCard.displayName = 'ProductCard';
