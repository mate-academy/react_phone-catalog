import React from 'react';
import './ButtonFavorite.scss';
import cn from 'classnames';
import { useThemeState } from '../../stateManagers/themeState';

interface ButtonFavoriteProps {
  isActive?: boolean;
  onClick?: () => void;
}

export const ButtonFavorite: React.FC<ButtonFavoriteProps> = ({
  isActive = false,
  onClick,
}) => {
  const { theme } = useThemeState();
  return (
    <button
      className={cn('buttonFavorite', `buttonFavorite--${theme}`, {
        [`buttonFavorite--liked--${theme}`]: isActive,
      })}
      type="button"
      aria-label={isActive ? 'Remove from favorite' : 'Add to favorite'}
      onClick={onClick}
    ></button>
  );
};
