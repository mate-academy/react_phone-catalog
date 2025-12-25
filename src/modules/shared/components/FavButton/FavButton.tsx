import { useTheme } from '@/context/ThemeContext';
import classNames from 'classnames';
import React from 'react';
import styles from './FavButton.module.scss';
type FavButtonProps = {
  fav: boolean;
  handleFav: (e: React.MouseEvent) => void;
};

const FavButton: React.FC<FavButtonProps> = ({ fav, handleFav }) => {
  const { theme } = useTheme();

  return (
    <button
      className={classNames(
        styles['btn-fav'],
        { [styles['btn-fav--added']]: fav },
        { [styles['btn-fav--dark']]: theme === 'dark' },
      )}
      onClick={handleFav}
    >
      {/* SVG для сердечка */}
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill={'none'}
        stroke={'currentColor'}
        strokeWidth="2"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
      </svg>
    </button>
  );
};

export default FavButton;
