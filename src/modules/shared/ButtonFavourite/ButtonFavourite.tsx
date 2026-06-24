import React from 'react';
import classNames from 'classnames';

import styles from './ButtonFavourite.module.scss';

type ButtonFavouritesProps = {
  isDetail?: boolean;
  onClick: () => void;
  image: string;
};

export const ButtonFavourite = ({
  isDetail,
  onClick,
  image,
}: ButtonFavouritesProps) => {
  return (
    <button
      className={classNames(styles.button, {
        [styles['button--detail']]: isDetail,
      })}
      onClick={onClick}
    >
      <img className={styles.button__img} src={image} alt="" />
    </button>
  );
};
