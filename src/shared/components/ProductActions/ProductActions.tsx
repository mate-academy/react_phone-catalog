import React from 'react';
import { useCart } from '@/shared/context/CartContext';
import { useFavorites } from '@/shared/context/FavoriteContext';
import { Product } from '@/shared/types';

import { IconButton } from '../Buttons/components/IconButton';
import { ActionButton } from '../Buttons/components/ActionButton';
// eslint-disable-next-line max-len
import FavoriteIconDefault from '@/shared/assets/icons/hearts/heart-default.svg?react';
// eslint-disable-next-line max-len
import FavoriteIconSelected from '@/shared/assets/icons/hearts/heart-selected.svg?react';

import cn from 'classnames';
import './ProductActions.scss';

type Props = {
  product: Product;
  className?: string;
};

export const ProductActions: React.FC<Props> = ({
  product,
  className = '',
}) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { isInCart, addToCart } = useCart();
  const inCart = isInCart(product.id);
  const isProductFavorite = isFavorite(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (inCart) {
      return;
    }

    addToCart(product);
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(product);
  };

  return (
    <div className={`product-actions ${className}`.trim()}>
      <ActionButton
        className="product-actions__btn-add"
        aria-label="Add to cart"
        onClick={handleAddToCart}
        isActive={inCart}
      >
        {!inCart ? 'Add to cart' : 'Added to cart'}
      </ActionButton>

      <IconButton
        className={cn('product-actions__btn-favorite', {
          'product-actions__btn-favorite--active': isProductFavorite,
        })}
        aria-label={
          isProductFavorite ? 'Remove from favorites' : 'Add to favorites'
        }
        onClick={handleToggleFavorite}
      >
        {isProductFavorite ? (
          <FavoriteIconSelected className="product-actions__favorite-icon" />
        ) : (
          <FavoriteIconDefault className="product-actions__favorite-icon" />
        )}
      </IconButton>
    </div>
  );
};
