import './ProductActions.scss';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
  handleToggleCart: (e: React.MouseEvent) => void;
  onToggleFavorite: (e: React.MouseEvent) => void;
  isFavorite?: boolean;
  isInCart?: boolean;
}

export const ProductActions: React.FC<Props> = ({
  handleToggleCart,
  onToggleFavorite,
  isFavorite,
  isInCart,
}) => {
  const { t } = useTranslation();

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleFavorite(e);
  };

  return (
    <div className="product-actions">
      <button
        type="button"
        className={`product-actions__add-to-cart ${isInCart ? 'in-cart' : ''}`}
        onClick={handleToggleCart}
      >
        {isInCart ? t('product.added') : t('product.add_to_cart')}
      </button>

      <button
        type="button"
        className={`product-actions__favorites ${isFavorite ? 'product-actions__favorites--active' : ''}`}
        onClick={handleToggleFavorite}
        aria-label={
          isFavorite ?
            t('product.remove_favorite', 'Remove from favorites')
          : t('product.add_favorite', 'Add to favorites')
        }
      ></button>
    </div>
  );
};
