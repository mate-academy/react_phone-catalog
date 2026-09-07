import React from 'react';
import styles from './FaforiteButton.module.scss';
import { FavoriteIcon } from '../../Icon/FavoriteIcon';
import cn from 'classnames';

interface Props {
  active?: boolean;
  className?: string;
  onClick?: () => void;
}

export const FavoriteButton: React.FC<Props> = ({
  active = false,
  className,
  onClick = () => {},
}) => {
  return (
    <button
      type="button"
      className={cn(styles.button, className, { [styles.active]: active })}
      onClick={onClick}
    >
      <FavoriteIcon active={active} />
    </button>
  );
};
