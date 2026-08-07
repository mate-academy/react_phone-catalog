import classNames from 'classnames';

import React from 'react';
import styles from './FavouriteButton.module.scss';
import FavouriteIcon from '@public/img/icons/icon-favourite.svg?react';
import FavouriteFilled from '@public/img/icons/icon-favourite-filled.svg?react';

type Props = {
  isActive: boolean;
  onClick: (e: React.MouseEvent) => void;
  className?: string;
};

export const FavouriteButton: React.FC<Props> = ({
  isActive,
  onClick,
  className,
}) => {
  const Icon = isActive ? FavouriteFilled : FavouriteIcon;

  return (
    <button
      type="button"
      onClick={onClick}
      className={classNames(styles.favouriteBtn, className, {
        [styles.isActive]: isActive,
      })}
    >
      <Icon className={styles.favouriteIcon} />
    </button>
  );
};
