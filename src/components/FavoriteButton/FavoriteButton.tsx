import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useFavorites } from '../../context/FavoriteContext';
import styles from './FavoriteButton.module.scss';

import Favorite from './icons/favorite.png';
import DarkFavorite from './icons/favorite-dark.png';

interface Props {
  onLinkClick?: () => void;
}

export const FavoriteButton: React.FC<Props> = ({ onLinkClick }) => {
  const { favorites } = useFavorites();
  const { theme } = useTheme();
  const count = favorites.length;
  const favoriteIcon = theme === 'dark' ? DarkFavorite : Favorite;

  return (
    <NavLink to="/favorites" className={({ isActive }) => `${styles.button} ${isActive ? styles.active : ''}`} aria-label={`Favorites (${count} items)`} onClick={onLinkClick}>
      <div className={styles.iconWrapper}>
        {/* Heart icon */}
        <img src={favoriteIcon} alt="favorite" className={styles.favoriteIcon} />

        {/* Badge counter - only show if count > 0 */}
        {count > 0 && <span className={styles.badge}>{count}</span>}
      </div>
    </NavLink>
  );
};
