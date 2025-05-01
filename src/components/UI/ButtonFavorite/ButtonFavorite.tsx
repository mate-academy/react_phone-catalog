import React from 'react';
import styles from './ButtonFavorite.module.scss';

import classNames from 'classnames';
import { HeartIcon } from '../../../img/icons/heart-icon/HeartIcon';

type Props = {
  selected: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export const ButtonFavorite: React.FC<Props> = ({
  selected,
  onClick = () => {},
  ...rest
}) => {
  return (
    <button
      className={classNames(styles['favorite-btn'], {
        [styles['favorite-btn--selected']]: selected,
      })}
      onClick={onClick}
      {...rest}
    >
      <HeartIcon selected={selected} />
    </button>
  );
};
