import React from 'react';

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
      className={classNames('button-box button--favorite', {
        'button--favorite-selected': selected,
      })}
      onClick={onClick}
      {...rest}
    >
      <HeartIcon selected={selected} />
    </button>
  );
};
