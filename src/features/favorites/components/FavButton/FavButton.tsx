import { useTheme } from '@/app/providers/ThemeContext';
import { IconHeartOutline } from '@/shared/ui/Icons/IconHeartOutline';
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
      <IconHeartOutline />
    </button>
  );
};

export default FavButton;
