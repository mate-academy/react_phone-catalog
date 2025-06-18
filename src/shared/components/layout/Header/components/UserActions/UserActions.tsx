/* eslint-disable @typescript-eslint/no-use-before-define */
import React from 'react';

import { NavLink } from 'react-router-dom';

import classNames from 'classnames';
import { useSelector } from 'react-redux';

import { useMenuContext } from '../../../../../../contexts/MenuContext';
import { selectCartQuantity } from '../../../../../../features/cart/cart.selectors';
import { selectFavoritesQuantity } from '../../../../../../features/favorites/favorites.selectors';
import { Icon } from '../../../../../../shared/components/ui/Icon/Icon';
import { IconNames } from '../../../../../../shared/components/ui/Icon/IconNames';
import { closeMenu } from '../../../../../../shared/helpers/handlers';
import { QuantityBadge } from '../../../../ui/QuantityBadge';

import styles from './UserActions.module.scss';

const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  classNames(styles.icon, {
    [styles.linkActive]: isActive,
  });

export const UserActions: React.FC = () => {
  const { isMenuOpen, toggleMenu } = useMenuContext();
  const cartQuantity = useSelector(selectCartQuantity);
  const favoritesQuantity = useSelector(selectFavoritesQuantity);

  return (
    <div
      className={classNames(styles.userActions, {
        [styles.menuOpen]: isMenuOpen,
      })}
    >
      <NavLink
        className={getLinkClass}
        to="/favorites"
        onClick={() => closeMenu(isMenuOpen, toggleMenu)}
      >
        <div className={styles.iconWithBadge}>
          <Icon className={styles.iconImage} name={IconNames.Heart} />
          <QuantityBadge count={favoritesQuantity} />
        </div>
      </NavLink>

      <NavLink
        className={getLinkClass}
        to="/cart"
        onClick={() => closeMenu(isMenuOpen, toggleMenu)}
      >
        <div className={styles.iconWithBadge}>
          <Icon className={styles.iconImage} name={IconNames.Cart} />
          <QuantityBadge count={cartQuantity} />
        </div>
      </NavLink>
    </div>
  );
};
