import classNames from 'classnames';
import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './CartAndFavouritesButtons.module.scss';

interface Props {
  variant: string;
  onLinkClick?: () => void;
}

export const CartAndFavouritesButtons: React.FC<Props> = ({
  variant,
  onLinkClick,
}) => {
  return (
    <ul
      className={classNames(styles.buttons, {
        [styles['buttons--header']]: variant === 'header',
        [styles['buttons--menu']]: variant === 'menu',
      })}
    >
      <li className={styles.button}>
        <NavLink
          to="favourites"
          onClick={onLinkClick}
          className={({ isActive }) =>
            classNames(
              styles.button__link,
              styles['button__link--favourites'],
              {
                [styles.active]: isActive,
              },
            )
          }
        ></NavLink>
      </li>

      <li className={styles.button}>
        <NavLink
          to="cart"
          onClick={onLinkClick}
          className={({ isActive }) =>
            classNames(styles.button__link, styles['button__link--cart'], {
              [styles.active]: isActive,
            })
          }
        ></NavLink>
      </li>
    </ul>
  );
};
