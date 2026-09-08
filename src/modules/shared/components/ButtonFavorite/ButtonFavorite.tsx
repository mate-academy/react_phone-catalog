import React from 'react';
import cn from 'classnames';
import { Icon } from '../Icon/Icon';
import styles from './ButtonFavorite.module.scss';

type Props = {
  selected: boolean;
  onClick: () => void;
  size?: 'small' | 'large';
};

export const ButtonFavorite: React.FC<Props> = ({
  selected,
  onClick,
  size = 'small',
}) => (
  <button
    className={cn(styles['button-fav'], styles[`button-fav--${size}`], {
      [styles['button-fav--selected']]: selected,
    })}
    onClick={onClick}
  >
    <Icon name={selected ? 'heart__selected' : 'heart'} />
  </button>
);
