import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../context/ThemeContext';
import styles from './ProductActions.module.scss';

// Import heart icons
import lightHeart from './icons/light-heart.png';
import darkHeart from './icons/dark-heart.png';
import redHeart from './icons/red-heart.png';

interface Props {
  inCart: boolean;
  inFavorites: boolean;
  onAddToCart: () => void;
  onToggleFavorite: () => void;
  className?: string;
}

export const ProductActions: React.FC<Props> = ({ inCart, inFavorites, onAddToCart, onToggleFavorite, className }) => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  // Determine which heart icon to show
  const getHeartIcon = () => {
    if (inFavorites) {
      return redHeart; // Always red when favorited
    }

    return theme === 'dark' ? darkHeart : lightHeart;
  };

  return (
    <div className={`${styles.actions} ${className || ''}`}>
      <button className={`${styles.addButton} ${inCart ? styles.addButtonAdded : ''}`} onClick={onAddToCart} disabled={inCart} type="button">
        {inCart ? t('addedToCart') : t('addToCart')}
      </button>

      <button className={`${styles.favoriteButton} ${inFavorites ? styles.favoriteButtonActive : ''}`} onClick={onToggleFavorite} type="button" aria-label={inFavorites ? 'Remove from favorites' : 'Add to favorites'}>
        <img src={getHeartIcon()} alt={inFavorites ? 'Favorited' : 'Add to favorites'} className={styles.heartIcon} />
      </button>
    </div>
  );
};
