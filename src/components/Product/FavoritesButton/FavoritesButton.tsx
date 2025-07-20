import type { FC } from 'react';
import heartIcon from '/icons/favourites.svg';
import heartIconActive from '/icons/favourites_active.svg';
import styles from './FavoritesButton.module.scss';

type Props = {
  onClick: () => void;
  isActive: boolean;
};

export const FavoritesButton: FC<Props> = ({ onClick, isActive }) => {
  return (
    <button
      className={styles.favBtn}
      onClick={onClick}
    >
      <img
        src={isActive ? heartIconActive : heartIcon}
        alt="favorite"
      />
    </button>
  );
};

// return <button className={styles.FavoritesButton}>FavoritesButton</button>;
